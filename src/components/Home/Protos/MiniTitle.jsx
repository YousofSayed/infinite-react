import React from 'react'

export const MiniTitle = ({ children }) => {
    return (
      <section className="bg-blue-700 p-2  text-center rounded-lg w-full">
        <p className="text-white font-bold">{children}</p>
      </section>
    );
  };
