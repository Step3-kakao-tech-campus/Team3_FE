"use client";

import React, { useState, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  selectedOption: string;
  onChange: (selectedValue: string) => void;
}

export default function Dropdown({ options, selectedOption, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen) {
        const dropdown = document.getElementById("dropdown");
        if (dropdown && !dropdown.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div id='dropdown' className='relative inline-block text-left'>
      <div className='relative'>
        <button
          onClick={toggleDropdown}
          type='button'
          className='inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 focus-visible:ring-blue-300'
          id='options-menu'
          aria-haspopup='true'
          aria-expanded={isOpen}
        >
          {selectedOption}
          <svg
            className={`w-5 h-5 ml-2 transition-transform transform ${isOpen ? "rotate-180" : ""}`}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M6.293 5.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className='absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg origin-top-right ring-1 ring-black ring-opacity-5'>
          <ul className='py-1'>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
