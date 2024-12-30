import React, { useState, useEffect } from 'react';
import { EmailProvider } from './EmailContext';
import signin from '../Components/Signin';
import biography from '../Components/Biography';
import address from '../Components/Address';
import birthdate from '../Components/Birthdate';

//For the skae of time, I'm updating the components to be in lowercases because the fetched column names are in lowercases.
const components = { signin, biography, address, birthdate };

const Rendering = () => {
  return (
    <EmailProvider>
      <Wizard />
    </EmailProvider>
  );
};

const Wizard = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageComponents, setPageComponents] = useState({
    page1: ['signin'],
    page2: [],
    page3: [],
  });
  const [pages, setPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/admin');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      // console.log('Fetched config data:', data);
      setConfig(data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
    // console.log('Config in rendering:', config);
  }, []);

  useEffect(() => {
    if (config) {
      // console.log('before update:', pageComponents);
      const updatedPageComponents = { ...pageComponents };
      Object.entries(config).forEach(([component, page]) => {
        if (updatedPageComponents[page]) {
          const uniqueComponents = new Set(updatedPageComponents[page]);
          uniqueComponents.add(component);
          updatedPageComponents[page] = Array.from(uniqueComponents);
        }
      });
      // console.log('after update:', updatedPageComponents);
      setPageComponents(updatedPageComponents);
    }
  }, [config]);

  useEffect(() => {
    setPages(Object.entries(pageComponents));
  }, [pageComponents]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const goToNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const [currentPage, component] = pages[currentPageIndex] || [];

  return (
    <div>
      <h3>
        {currentPage
          ? currentPage.charAt(0).toUpperCase() +
            currentPage.slice(1, 4) +
            ' ' +
            currentPage.slice(4)
          : ''}
      </h3>
      {component?.map((componentName, i) => {
        const ComponentToRender = components[componentName];
        return ComponentToRender ? (
          <ComponentToRender key={i} />
        ) : (
          <p key={i}>Default blank</p>
        );
      })}

      <div style={{ marginTop: '20px' }}>
        <button onClick={goToPreviousPage} disabled={currentPageIndex === 0}>
          Back
        </button>
        <button
          onClick={goToNextPage}
          disabled={currentPageIndex === pages.length - 1}
          style={{ marginLeft: '10px' }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Rendering;
