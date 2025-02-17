interface RobotIconProps {
  className?: string;
}

export function RobotIcon({ className = "w-6 h-6" }: RobotIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C11.0111 2 10.0444 2.29324 9.22215 2.84265C8.39991 3.39206 7.75904 4.17295 7.3806 5.08658C7.00216 6.00021 6.90315 7.00555 7.09607 7.97545C7.289 8.94536 7.76521 9.83627 8.46447 10.5355C9.16373 11.2348 10.0546 11.711 11.0245 11.9039C11.9945 12.0969 12.9998 11.9978 13.9134 11.6194C14.827 11.241 15.6079 10.6001 16.1573 9.77785C16.7068 8.95561 17 7.98891 17 7"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 22V19C5 17.9391 5.42143 16.9217 6.17157 16.1716C6.92172 15.4214 7.93913 15 9 15H15C16.0609 15 17.0783 15.4214 17.8284 16.1716C18.5786 16.9217 19 17.9391 19 19V22"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
