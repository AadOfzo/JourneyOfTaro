import React from 'react';

const ErrorMessage = ({ message }) => {
return (
<div style={{ color: 'red' }}>
<h2>{message}</h2>
</div>
);
};

export default ErrorMessage;
