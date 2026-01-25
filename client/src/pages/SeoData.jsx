// src/components/SeoAnalyzer.jsx
import React, { useState, useRef, useEffect } from 'react';
import getSeoData from '../api/brightDataSeo.js';

const SeoAnalyzer = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const abortControllerRef = useRef(null);
  const [retryCount, setRetryCount] = useState(0);

  // Load search history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('seoSearchHistory');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to load search history:', e);
      }
    }
  }, []);

  // Save search history to localStorage
  const saveToHistory = (searchData) => {
    const newHistory = [
      { 
        query: searchData.query, 
        timestamp: new Date().toISOString(),
        htmlLength: searchData.raw_html.length
      },
      ...searchHistory.slice(0, 9) // Keep last 10 searches
    ];
    setSearchHistory(newHistory);
    localStorage.setItem('seoSearchHistory', JSON.stringify(newHistory));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError({ message: 'Please enter a search query' });
      return;
    }

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsLoading(true);
    setError(null);
    setRetryCount(0);

    try {
      const data = await getSeoData(query, {
        signal: abortController.signal,
        retries: 2
      });

      setResult(data);
      saveToHistory(data);
    } catch (err) {
      // Only set error if not aborted
      if (err.name !== 'AbortError' && err.kind !== 'abort') {
        setError(err);
        setRetryCount(err.retryCount || 0);
      }
    } finally {
      if (!abortController.signal.aborted) {
        setIsLoading(false);
      }
      abortControllerRef.current = null;
    }
  };

  const handleHistoryClick = (historyItem) => {
    setQuery(historyItem.query);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('seoSearchHistory');
  };

  const retrySearch = () => {
    if (query) {
      handleSearch({ preventDefault: () => {} });
    }
  };

  const cancelSearch = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const copyHtmlToClipboard = () => {
    if (result?.raw_html) {
      navigator.clipboard.writeText(result.raw_html)
        .then(() => alert('HTML copied to clipboard!'))
        .catch(() => alert('Failed to copy HTML'));
    }
  };

  const downloadHtml = () => {
    if (result?.raw_html) {
      const blob = new Blob([result.raw_html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `serp-${result.query.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="seo-analyzer">
      <div className="search-container">
        <h1>SEO SERP Analyzer</h1>
        <p className="subtitle">Fetch and analyze Google search results HTML</p>
        
        <form onSubmit={handleSearch} className="search-form">
          <div className="input-group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your search query (e.g., 'best seo tools 2024')"
              disabled={isLoading}
              className="search-input"
            />
            <button 
              type="submit" 
              disabled={isLoading || !query.trim()}
              className="search-button"
            >
              {isLoading ? 'Fetching...' : 'Analyze'}
            </button>
            {isLoading && (
              <button 
                type="button" 
                onClick={cancelSearch}
                className="cancel-button"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {error && (
          <div className="error-container">
            <div className="error-header">
              <strong>Error: {error.message}</strong>
              {error.kind === 'http' && error.status && (
                <span className="error-status">Status: {error.status}</span>
              )}
            </div>
            {error.requestId && (
              <small className="error-id">Request ID: {error.requestId}</small>
            )}
            {error.details && (
              <pre className="error-details">
                {JSON.stringify(error.details, null, 2)}
              </pre>
            )}
            {error.kind !== 'abort' && (
              <button onClick={retrySearch} className="retry-button">
                Retry {retryCount > 0 && `(${retryCount})`}
              </button>
            )}
          </div>
        )}

        {searchHistory.length > 0 && (
          <div className="history-section">
            <div className="history-header">
              <h3>Recent Searches</h3>
              <button onClick={clearHistory} className="clear-history-button">
                Clear
              </button>
            </div>
            <div className="history-list">
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleHistoryClick(item)}
                  className="history-item"
                  title={`${new Date(item.timestamp).toLocaleString()} - ${item.htmlLength} chars`}
                >
                  {item.query}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {result && (
        <div className="results-container">
          <div className="results-header">
            <h2>
              Results for: <span className="query-highlight">{result.query}</span>
            </h2>
            <div className="results-meta">
              <span className="meta-item">
                Source: <strong>{result.source}</strong>
              </span>
              <span className="meta-item">
                HTML Length: <strong>{result.raw_html.length.toLocaleString()} chars</strong>
              </span>
              {result.requestId && (
                <span className="meta-item">
                  Request ID: <code>{result.requestId}</code>
                </span>
              )}
            </div>
            <div className="action-buttons">
              <button onClick={copyHtmlToClipboard} className="action-button">
                Copy HTML
              </button>
              <button onClick={downloadHtml} className="action-button">
                Download HTML
              </button>
            </div>
          </div>

          <div className="html-preview">
            <div className="preview-header">
              <h3>HTML Preview</h3>
              <small>First 2000 characters shown</small>
            </div>
            <pre className="html-content">
              {result.raw_html.substring(0, 2000)}
              {result.raw_html.length > 2000 && '...'}
            </pre>
            {result.raw_html.length > 2000 && (
              <div className="preview-footer">
                Showing first 2000 of {result.raw_html.length.toLocaleString()} characters
              </div>
            )}
          </div>

          <div className="raw-data">
            <h3>Raw Response Data</h3>
            <pre className="json-preview">
              {JSON.stringify({
                success: result.success,
                source: result.source,
                query: result.query,
                html_length: result.raw_html.length,
                meta: result.meta
              }, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeoAnalyzer;