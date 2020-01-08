import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import './Loading.css';

function Loading(props) {
  // Basic loading spinner to indicate pending changes
  return <FaSpinner className="loading" />;
}

export default Loading;
