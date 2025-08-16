// =============================================================================
// COMMUNICATION ICONS
// Communication, social, and interaction icons
// =============================================================================

interface IconProps {
    size?: number;
    color?: string;
    className?: string;
  }
  
  // Phone Icon
  export function PhoneIcon({ size = 24, color = 'currentColor', className = '' }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.19 12.85C3.49997 10.2412 2.44824 7.27099 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.21649 3.36162C2.3051 3.09849 2.44748 2.85669 2.63519 2.65162C2.82289 2.44655 3.05056 2.28271 3.30552 2.17052C3.56048 2.05833 3.83498 2.00026 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.11 3.72C9.23662 4.68007 9.47144 5.62273 9.81 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  
  // Message Circle Icon
  export function MessageCircleIcon({ size = 24, color = 'currentColor', className = '' }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0034 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.60571 8.7 3.90001C9.87812 3.30493 11.1801 2.99656 12.5 3H13C15.0843 3.11499 17.053 3.99476 18.5291 5.47086C20.0052 6.94697 20.885 8.91565 21 11V11.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  
  // Send Icon
  export function SendIcon({ size = 24, color = 'currentColor', className = '' }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M2 2L22 12L2 22L7 12L2 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  
  // Share Icon
  export function ShareIcon({ size = 24, color = 'currentColor', className = '' }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="18" cy="5" r="3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="6" cy="12" r="3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="19" r="3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.59 13.51L15.42 17.49" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.41 6.51L8.59 10.49" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  
  // Link Icon
  export function LinkIcon({ size = 24, color = 'currentColor', className = '' }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.47L11.75 5.18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 11C13.5705 10.4259 13.0226 9.95095 12.3934 9.60712C11.7643 9.26329 11.0685 9.05894 10.3533 9.00775C9.63819 8.95656 8.92037 9.05977 8.24860 9.31034C7.57682 9.56091 6.96687 9.95301 6.46 10.46L3.46 13.46C2.54918 14.403 2.04520 15.6661 2.05660 16.9770C2.068 18.288 2.59384 19.5421 3.52088 20.4691C4.44792 21.3962 5.70199 21.922 7.01297 21.9334C8.32395 21.9448 9.58696 21.4408 10.53 20.53L12.24 18.82" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  
  // At Sign Icon
  export function AtSignIcon({ size = 24, color = 'currentColor', className = '' }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 8V13C16 13.5304 16.2107 14.0391 16.5858 14.4142C16.9609 14.7893 17.4696 15 18 15C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V12C20 7.58172 16.4183 4 12 4S4 7.58172 4 12S7.58172 20 12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  
  // Wifi Icon
  export function WifiIcon({ size = 24, color = 'currentColor', className = '' }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M1.42 9C3.28 6.56 5.69 4.58 8.49 3.21C11.29 1.84 14.4 1.13 17.58 1.13C20.76 1.13 23.87 1.84 26.67 3.21C29.47 4.58 31.88 6.56 33.74 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 12.55C6.26 11.16 7.87 10.11 9.68 9.5C11.49 8.89 13.42 8.74 15.3 9.06C17.18 9.38 18.94 10.16 20.41 11.32C21.88 12.48 22.99 13.98 23.64 15.68" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.53 16.11C9.34 15.47 10.31 15.07 11.34 14.95C12.37 14.83 13.42 14.99 14.37 15.41C15.32 15.83 16.13 16.49 16.71 17.31C17.29 18.13 17.61 19.09 17.64 20.07" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="20" r="1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  
  // Bluetooth Icon
  export function BluetoothIcon({ size = 24, color = 'currentColor', className = '' }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M6.5 6.5L17.5 17.5L12 23V1L17.5 6.5L6.5 17.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  
  // Export all communication icons
  export const communicationIcons = {
    PhoneIcon,
    MessageCircleIcon,
    SendIcon,
    ShareIcon,
    LinkIcon,
    AtSignIcon,
    WifiIcon,
    BluetoothIcon,
  };