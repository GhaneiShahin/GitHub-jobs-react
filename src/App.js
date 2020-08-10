import React, { useState } from 'react';
import { useFetchJobs } from './fetchJobs';
import Job from './components/Job';
import { Spinner } from 'react-bootstrap';
import JobsPagination from './components/JobsPagination';
import SearchForm from './components/SearchForm';

const App = () => {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  const handleParamChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  };

  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);
  return (
    <div className="container my-4">
      <h1 className="mb-4">GitHub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && (
        <div
          style={{ height: '500px' }}
          className="d-flex justify-content-center align-items-center"
        >
          <Spinner animation="grow" variant="primary" />{' '}
        </div>
      )}
      {error && <h1>something went wrong!</h1>}
      {jobs.map((job) => (
        <Job key={job.id} job={job} />
      ))}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </div>
  );
};

export default App;
