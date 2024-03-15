import type { ComponentProps } from "react";

export const StarIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      viewBox="0 0 576 512"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M316.9 18c-5.3-11-16.5-18-28.8-18s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329l-24.6 145.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329l104.2-103.1c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7l-143.7-21.2L316.9 18z" />
    </svg>
  );
};

export const EmptyStarIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M6.1 21.98a1 1 0 01-1.45-1.06l1.03-6.03-4.38-4.26a1 1 0 01.56-1.71l6.05-.88 2.7-5.48a1 1 0 011.8 0l2.7 5.48 6.06.88a1 1 0 01.55 1.7l-4.38 4.27 1.04 6.03a1 1 0 01-1.46 1.06l-5.4-2.85-5.42 2.85zm4.95-4.87a1 1 0 01.93 0l4.08 2.15-.78-4.55a1 1 0 01.29-.88l3.3-3.22-4.56-.67a1 1 0 01-.76-.54l-2.04-4.14L9.47 9.4a1 1 0 01-.75.54l-4.57.67 3.3 3.22a1 1 0 01.3.88l-.79 4.55 4.09-2.15z" />
    </svg>
  );
};

export const DownArrowIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      viewBox="0 0 466 1000"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M405 380c14.667-17.333 30.667-17.333 48 0 17.333 14.667 17.333 30.667 0 48L257 620c-14.667 14.667-30.667 14.667-48 0L13 428c-17.333-17.333-17.333-33.333 0-48 16-16 32.667-16 50 0l170 156 172-156" />
    </svg>
  );
};

export const UpArrowIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      viewBox="0 0 464 1000"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M62 620c-17.333 14.667-34 14.667-50 0-16-16-16-32.667 0-50l196-190c17.333-17.333 33.333-17.333 48 0l196 190c16 17.333 16 34 0 50-16 14.667-32.667 14.667-50 0L232 462 62 620" />
    </svg>
  );
};

export const CloseIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em" {...props}>
      <path
        fill="currentColor"
        d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"
      />
    </svg>
  );
};

export const MemoIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M416 221.25V416a48 48 0 01-48 48H144a48 48 0 01-48-48V96a48 48 0 0148-48h98.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M256 56v120a32 32 0 0032 32h120M176 288h160M176 368h160"
      />
    </svg>
  );
};

export const LoadingIcon = (props: ComponentProps<"svg">) => {
  return (
    <div className="flex items-center space-x-2">
      <div aria-label="Loading..." role="status">
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 animate-spin strokeSlate-500"
          {...props}
        >
          <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"></path>
        </svg>
      </div>
      <span className="text-xs font-medium text-slate-500">Loading...</span>
    </div>
  );
};

export const PlusIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M256 112v288M400 256H112"
      />
    </svg>
  );
};
