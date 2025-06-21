"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PopoverTransition() {
    const [enlarged, setEnlarged] = useState(false);

    const originRef = React.useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     if (originRef.current) {
    //         console.log("Origin Element Dimensions:", JSON.stringify(originRef.current.getBoundingClientRect(), null, 2));
    //     }
    // }, [originRef]);

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {/* Main Content */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "start" }}>
                <AnimatePresence>
                    {!enlarged && <motion.div
                        ref={originRef}
                        layout
                        layoutId="popover-box"
                        initial={{
                            opacity: 1,
                            top: 400,
                            left: 200,
                            right: window.innerWidth - 200,
                            width: 200,
                            height: 200,
                            borderRadius: 16,
                            // zIndex: 1,
                        }}
                        animate={{
                            opacity: 1,
                            top: 400,
                            left: 200,
                            right: window.innerWidth - 200,
                            width: 200,
                            height: 200,
                            borderRadius: 16,
                            // zIndex: 1,
                        }}
                        exit={{
                            opacity: 0,
                            top: 0,
                            left: window.innerWidth / 2,
                            right: 0,
                            width: "50vw",
                            height: "100vh",
                            borderRadius: 0,
                            // zIndex: 3
                        }}
                        // animate={}
                        transition={{ type: "keyframes", duration: 5, ease: "easeInOut" }}
                        style={{
                            background: "#007bff",
                            cursor: "pointer",
                            position: "fixed",
                            display: "flex",
                            zIndex: 2,
                        }}
                        onClick={() => setEnlarged(!enlarged)}
                    >
                        Click me
                    </motion.div>}
                </AnimatePresence>
            </div>

            {/* Side View (Split Layout) */}
            <AnimatePresence>
                {enlarged && (
                    <motion.div
                        layout
                        layoutId="popover-box"
                        initial={{
                            // x: 200,
                            // y: 500,
                            // opacity: 0,
                            borderRadius: 16,
                            top: originRef.current?.getBoundingClientRect().top,
                            left: originRef.current?.getBoundingClientRect().left,
                            right: originRef.current?.getBoundingClientRect().right,
                            width: originRef.current?.getBoundingClientRect().width,
                            height: originRef.current?.getBoundingClientRect().height
                        }}
                        animate={{
                            // y: 0,
                            // x: -0,
                            opacity: 1,
                            top: 0,
                            left: window.innerWidth / 2,
                            right: 0,
                            width: "50vw",
                            height: "100vh",
                            borderRadius: 0
                        }}
                        // exit={{ x: 200, opacity: 0 }}
                        transition={{ type: "keyframes", duration: 5, ease: "easeInOut" }}
                        style={{
                            position: "fixed",
                            display: "flex",
                            background: "#ffc107",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 1
                        }}
                    >
                        <div style={{ fontSize: 24 }}>Side View Content</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}