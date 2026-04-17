import { User } from "../auth/auth.model.js";
import { Blog } from "../blog/blog.model.js";

function startOfDay(date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function addDays(date, amount) {
  const value = new Date(date);
  value.setDate(value.getDate() + amount);
  return value;
}

function formatDayKey(date) {
  return date.toISOString().slice(0, 10);
}

function buildFilledSeries(rawSeries, days) {
  const today = startOfDay(new Date());
  const startDate = addDays(today, -(days - 1));
  const seriesMap = new Map(rawSeries.map((entry) => [entry.date, entry.count]));
  const points = [];
  let runningTotal = 0;

  for (let index = 0; index < days; index += 1) {
    const currentDate = addDays(startDate, index);
    const dateKey = formatDayKey(currentDate);
    const count = seriesMap.get(dateKey) || 0;
    runningTotal += count;

    points.push({
      date: dateKey,
      count,
      cumulative: runningTotal,
    });
  }

  return points;
}

async function aggregateCreatedByDay(Model, days) {
  const today = startOfDay(new Date());
  const startDate = addDays(today, -(days - 1));

  const results = await Model.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        count: 1,
      },
    },
    {
      $sort: {
        date: 1,
      },
    },
  ]);

  return buildFilledSeries(results, days);
}

function sumCounts(entries, startIndex) {
  return entries.slice(startIndex).reduce((total, entry) => total + entry.count, 0);
}

export async function getAdminAnalytics(days = 30) {
  const [totalUsers, totalBlogs, usersByDay, blogsByDay] = await Promise.all([
    User.countDocuments(),
    Blog.countDocuments(),
    aggregateCreatedByDay(User, days),
    aggregateCreatedByDay(Blog, days),
  ]);

  const midpoint = Math.floor(days / 2);
  const usersFirstHalf = sumCounts(usersByDay, 0);
  const usersSecondHalf = sumCounts(usersByDay, midpoint);
  const blogsFirstHalf = sumCounts(blogsByDay, 0);
  const blogsSecondHalf = sumCounts(blogsByDay, midpoint);

  return {
    range: {
      days,
      from: usersByDay[0]?.date || null,
      to: usersByDay[usersByDay.length - 1]?.date || null,
    },
    totals: {
      users: totalUsers,
      blogs: totalBlogs,
    },
    growth: {
      users: {
        currentPeriod: usersSecondHalf,
        previousPeriod: usersFirstHalf,
      },
      blogs: {
        currentPeriod: blogsSecondHalf,
        previousPeriod: blogsFirstHalf,
      },
    },
    series: {
      usersByDay,
      blogsByDay,
    },
  };
}
