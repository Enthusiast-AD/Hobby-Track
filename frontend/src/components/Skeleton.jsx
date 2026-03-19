import React from 'react';

const Skeleton = ({ className }) => {
  return (
    <div className={`animate-pulse bg-[#002a20]/10 dark:bg-white/10 rounded-lg ${className}`}></div>
  );
};

export default Skeleton;