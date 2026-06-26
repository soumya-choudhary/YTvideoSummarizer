import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AvatarGroup, CardGroup } from "../components/LandingPage";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function LandingPage() {
    useGSAP(() => {
        gsap.from(".Landing-heading div", {
            y: -60,
            duration: 0.4,
            opacity: 0,
            stagger: 0.1,
            ease: "none",
        });

        gsap.to(".Landing-img-container div", {
            scale: 1.5,
            rotateX: 0,
            scrollTrigger: {
                trigger: ".Landing-img-container",
                scrub: 2,
                start: "top 85%",
                end: "top 20%",
            },
        });
    });

    return (
        <div className="Landing-wrapper pt-44 pb-20">
            {/* Heading Section */}
            <div className="Landing-heading flex flex-col gap-5 items-center w-[50rem] mx-auto h-96">
                <div className="font-medium text-[3.5rem]">
                    An AI tutor made for you
                </div>

                <div className="font-normal text-xl text-gray-500">
                    Learn from an AI tutor that understands your PDFs, videos, and
                    recorded lectures.
                </div>

                <div className="mt-3 flex gap-4">
                    <Link to="/login">
                        <button className="bg-white text-black py-3 px-8 rounded-full border text-lg cursor-pointer">
                            See Features
                        </button>
                    </Link>

                    <Link to="/signup">
                        <button className="bg-black text-white py-3 px-8 rounded-full text-lg cursor-pointer">
                            Get Started
                        </button>
                    </Link>
                </div>

                <div className="mt-3">
                    <AvatarGroup />
                </div>
            </div>

            {/* Video Section */}
            <div className="Landing-img-container transform-3d perspective-[1000px] mt-20">
                <div className="w-[45rem] h-[60vh] mx-auto rounded-2xl border-4 border-[#4F4F4F] overflow-hidden rotate-x-[25deg]">
                    <video
                        src="https://framerusercontent.com/assets/5JGYAIJtluYhmfGE0fIwnseS0.mp4"
                        muted
                        autoPlay
                        loop
                        playsInline
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>

            {/* Testimonials */}
            <div className="Landing-carousel-container mt-45">
                <CardGroup />
            </div>

            {/* Bottom CTA */}
            <div className="Landing-get-started-container bg-[#F6F6F6] h-[25rem] w-full rounded-4xl mt-24 flex justify-center items-center">
                <div className="flex flex-col gap-5 justify-center items-center">
                    <p className="font-semibold text-4xl">
                        Learn smarter, faster, easier.
                    </p>

                    <p className="text-gray-500">
                        Upload your content and start your learning journey.
                    </p>

                    <Link to="/signup">
                        <Button className="rounded-3xl w-36 h-12 text-md cursor-pointer">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;