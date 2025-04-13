import { memo, SVGProps, useState } from "react";

function StarRating() {
  const stars = 5;
  const [rating, setRating] = useState<number>(0);

  return (
    <main className="w-1/2 flex">
      {Array.from({ length: stars }, (_, ind) => (
        <button
          onClick={() => setRating(ind + 1)}
          className="border-none bg-none cursor-pointer"
          key={ind}
        >
          {ind + 1 <= rating ? <FilledStar className="w-full" /> : <EmptyStar className="w-full" />}
        </button>
      ))}
    </main>
  );
}

export default memo(StarRating);

function EStar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      version="1.0"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
      xmlSpace="preserve"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          fill="#231F20"
          d="M32.001,2.484c0.279,0,0.463,0.509,0.463,0.509l8.806,18.759l20.729,3.167L47,40.299L50.541,62 l-18.54-10.254L13.461,62l3.541-21.701L2.003,24.919l20.729-3.167L31.53,3.009C31.53,3.009,31.722,2.484,32.001,2.484 M32.001,0.007 c-0.775,0-1.48,0.448-1.811,1.15l-8.815,18.778L1.701,22.941c-0.741,0.113-1.356,0.632-1.595,1.343 c-0.238,0.71-0.059,1.494,0.465,2.031l14.294,14.657l-3.378,20.704c-0.124,0.756,0.195,1.517,0.822,1.957 C12.653,63.877,13.057,64,13.461,64c0.332,0,0.666-0.084,0.968-0.25l17.572-9.719l17.572,9.719c0.302,0.166,0.636,0.25,0.968,0.25 c0.404,0,0.808-0.123,1.151-0.366c0.627-0.44,0.946-1.201,0.822-1.957l-3.378-20.704l14.294-14.657 c0.523-0.537,0.703-1.321,0.465-2.031c-0.238-0.711-0.854-1.229-1.595-1.343l-19.674-3.006L33.812,1.157 C33.481,0.455,32.776,0.007,32.001,0.007L32.001,0.007z"
        ></path>{" "}
      </g>
    </svg>
  );
}

const EmptyStar = memo(EStar);

function FStar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      version="1.0"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
      xmlSpace="preserve"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          fill="#231F20"
          d="M63.893,24.277c-0.238-0.711-0.854-1.229-1.595-1.343l-19.674-3.006L33.809,1.15 C33.479,0.448,32.773,0,31.998,0s-1.48,0.448-1.811,1.15l-8.815,18.778L1.698,22.935c-0.741,0.113-1.356,0.632-1.595,1.343 c-0.238,0.71-0.059,1.494,0.465,2.031l14.294,14.657L11.484,61.67c-0.124,0.756,0.195,1.517,0.822,1.957 c0.344,0.243,0.747,0.366,1.151,0.366c0.332,0,0.666-0.084,0.968-0.25l17.572-9.719l17.572,9.719c0.302,0.166,0.636,0.25,0.968,0.25 c0.404,0,0.808-0.123,1.151-0.366c0.627-0.44,0.946-1.201,0.822-1.957l-3.378-20.704l14.294-14.657 C63.951,25.771,64.131,24.987,63.893,24.277z"
        ></path>{" "}
      </g>
    </svg>
  );
}

const FilledStar = memo(FStar);
