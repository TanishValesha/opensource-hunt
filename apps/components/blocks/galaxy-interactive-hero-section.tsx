"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Suspense, lazy } from 'react'
import { ImGithub } from "react-icons/im";
import { motion, useAnimation } from 'framer-motion';
import { signIn, useSession, SessionProvider } from 'next-auth/react';
import Image from 'next/image';
const Spline = lazy(() => import('@splinetool/react-spline'))


// Loading component to prevent white flash
function SplineLoader() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      backgroundColor: '#0d0d18',
      filter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    }}>
      {/* <div style={{
        width: '50px',
        height: '50px',
        border: '3px solid #8200DB',
        borderTop: '3px solid transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}></div> */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function HeroSplineBackground() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      pointerEvents: 'auto',
      overflow: 'hidden',
      backgroundColor: '#0d0d18', // Prevent white flash
    }}>
      <Suspense fallback={<SplineLoader />}>
        <Spline
          style={{
            width: '100%',
            height: '100vh',
            pointerEvents: 'auto',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
          scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
          onLoad={() => setIsLoaded(true)}
        />
      </Suspense>
      
      {/* Show loader until Spline is loaded */}
      {!isLoaded && <SplineLoader />}
      
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: `
            linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent 30%, transparent 70%, rgba(0, 0, 0, 0.8)),
            linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.9))
          `,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

function ScreenshotSection({ screenshotRef }: { screenshotRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <section className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 mt-11 md:mt-12">
      <div ref={screenshotRef} className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 w-full md:w-[80%] lg:w-[70%] mx-auto">
        <div>
          <img
            src="https://cdn.sanity.io/images/s6lu43cv/production-v4/13b6177b537aee0fc311a867ea938f16416e8670-3840x2160.jpg?w=3840&h=2160&q=10&auto=format&fm=jpg"
            alt="App Screenshot"
            className="w-full h-auto block rounded-lg mx-auto"
          />
        </div>
      </div>
    </section>
  );
}


function HeroContent() {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      controls.start("visible");
    }, 500); // Delay to allow Spline to start loading

    return () => clearTimeout(timer);
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { 
      x: -100, 
      opacity: 0 
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 0.8
      }
    }
  };

  const subtitleVariants = {
    hidden: { 
      y: 50, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 0.8
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      y: 30, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 0.8
      }
    }
  };

  const primaryButtonHover = {
    scale: 1.02,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  };

  const secondaryButtonHover = {
    scale: 1.02,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const navigate = useRouter();
  const {status} = useSession();

  return (
    <motion.div 
      className="text-left text-white pt-16 sm:pt-24 md:pt-32 px-4 max-w-3xl"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <style jsx>{`
        .heavy-shadow-primary {
          box-shadow: 
            0 0 0 1px rgba(130, 0, 219, 0.2),
            0 4px 8px rgba(130, 0, 219, 0.15),
            0 8px 24px rgba(130, 0, 219, 0.1),
            0 16px 32px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .heavy-shadow-secondary {
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.1),
            0 4px 8px rgba(0, 0, 0, 0.3),
            0 8px 24px rgba(0, 0, 0, 0.2),
            0 16px 32px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        
        .heavy-shadow-primary:hover {
          box-shadow: 
            0 0 0 1px rgba(130, 0, 219, 0.3),
            0 6px 12px rgba(130, 0, 219, 0.2),
            0 12px 32px rgba(130, 0, 219, 0.15),
            0 24px 48px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
        
        .heavy-shadow-secondary:hover {
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.15),
            0 6px 12px rgba(0, 0, 0, 0.4),
            0 12px 32px rgba(0, 0, 0, 0.25),
            0 24px 48px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
      `}</style>
      
      <motion.h1 
        className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-wide"
        variants={titleVariants}
      >
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Discover.{' '}
        </motion.span>
        <br className="sm:hidden" />
        <br className="sm:hidden" />
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          Contribute.<br />
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          {' '}Grow with Open Source.
        </motion.span>
      </motion.h1>
      
      <motion.p 
        className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-80 max-w-xl"
        variants={subtitleVariants}
      >
        Unlock curated open source repositories tailored to your skills.
Find beginner-friendly issues, explore trending projects, and start contributing — all in one place.
      </motion.p>
      
      <motion.div 
        className="flex pointer-events-auto flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-3"
        variants={buttonVariants}
      >
        <motion.button 
          className="bg-[#8200DB29] hover:bg-black/50 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 w-full sm:w-auto border border-[#322D36] heavy-shadow-primary" 
          style={{ backdropFilter: 'blur(8px)' }}
          whileHover={primaryButtonHover}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.3, duration: 0.6, type: "spring", stiffness: 100 }}
        >
          <motion.span
          onClick={() => {
          if( status !== "authenticated"){
            signIn("github", { callbackUrl: "/dashboard" })
          } else {
            navigate.push("/dashboard");
          }}}
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.4 }}
            className='flex justify-center items-center gap-2'
          >
            <span>Get Started</span><ImGithub className='text-2xl'/>
          </motion.span>
        </motion.button>
        
        <motion.button 
          className="pointer-events-auto bg-[#0009] border border-gray-600 hover:border-gray-400 text-gray-200 hover:text-white font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 flex items-center justify-center w-full sm:w-auto heavy-shadow-secondary"
          whileHover={secondaryButtonHover}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.6, type: "spring", stiffness: 100 }}
        >
          <motion.svg 
            className="w-4 h-4 sm:w-5 sm:h-5 mr-2" 
            fill="currentColor" 
            viewBox="0 0 20 20" 
            xmlns="http://www.w3.org/2000/svg"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </motion.svg>
          <motion.span
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 1.7, duration: 0.4 }}
          >
            Watch the Video
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Optional: Add a subtle floating animation for the entire container */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}

function Navbar() {
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    features: false,
    enterprise: false,
    resources: false,
  });

  const handleMouseEnterNavItem = (item: string) => setHoveredNavItem(item);
  const handleMouseLeaveNavItem = () => setHoveredNavItem(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setMobileDropdowns({ features: false, enterprise: false, resources: false });
    }
  };

  const toggleMobileDropdown = (key: keyof typeof mobileDropdowns) => {
    setMobileDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const navLinkClass = (itemName: string, extraClasses = '') => {
    const isCurrentItemHovered = hoveredNavItem === itemName;
    const isAnotherItemHovered = hoveredNavItem !== null && !isCurrentItemHovered;

    const colorClass = isCurrentItemHovered
      ? 'text-white'
      : isAnotherItemHovered
        ? 'text-gray-500'
        : 'text-gray-300';

     return `text-sm transition duration-150 ${colorClass} ${extraClasses}`;
  };

   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
         setMobileDropdowns({ features: false, enterprise: false, resources: false });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-20 shadow-2xl" 
      style={{ backgroundColor: 'rgba(13, 13, 24, 0.3)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: '0 0 15px 15px' }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="text-white flex gap-2 justify-center items-center">
            <Image src="/eye.png" width={50} height={50} alt='Logo'/>
            <span
          className="text-white font-bold flex text-2xl"
        >
          OpenSource-Hunt
        </span>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
          </div>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
         <button
         onClick={() => {
          if(status !== "authenticated"){
            signIn("github", { callbackUrl: "/dashboard" })
          } else {
            navigate.push("/dashboard");
          }
        }}
          className="bg-[#8200DB29] hover:bg-black/50 flex gap-2 justify-center items-center text-white font-semibold py-2 px-6 sm:px-6 rounded-full transition-all duration-300 w-full sm:w-auto border border-[#322D36] heavy-shadow-primary" 
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <span>{useSession().status === "authenticated" ? "View Projects" : "Sign In"}</span><ImGithub className='text-2xl'/>
        </button>
          {/* <button className="lg:hidden text-white p-2" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button> */}
        </div>
      </div>
    </motion.nav>
  );
}

export const HeroSection = () => {
  const screenshotRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (screenshotRef.current && heroContentRef.current) {
        requestAnimationFrame(() => {
          const scrollPosition = window.pageYOffset;
          if (screenshotRef.current) {
            screenshotRef.current.style.transform = `translateY(-${scrollPosition * 0.5}px)`;
          }

          const maxScroll = 400;
          const opacity = 1 - Math.min(scrollPosition / maxScroll, 1);
          if (heroContentRef.current) {
            heroContentRef.current.style.opacity = opacity.toString();
          }
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative" style={{ backgroundColor: '#0d0d18' }}>
      <Navbar />

      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroSplineBackground />
        </div>

        <div ref={heroContentRef} style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh',
          display: 'flex', justifyContent: 'flex-start', alignItems: 'center', zIndex: 10, pointerEvents: 'none'
        }}>
          <div className="container mx-auto">
            <HeroContent />
          </div>
        </div>
      </div>

      <div className="bg-black relative z-10" style={{ marginTop: '-5vh' }}>
        <ScreenshotSection screenshotRef={screenshotRef} />
        {/* <div className="container mx-auto px-4 py-16 text-white">
            <h2 className="text-4xl font-bold text-center mb-8">Other Content Below</h2>
             <p className="text-center max-w-xl mx-auto opacity-80">This is where additional sections of your landing page would go.</p>
        </div> */}
      </div>
    </div>
  );
};

export default HeroSection;