import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { testimonials } from "../../assets/testimonials";
import { Card, CardContent } from "../ui/card";
function CardGroup() {
    const marqueeRef = useRef(null);

    useGSAP(() => {
        const marquee = marqueeRef.current;
        if (!marquee) return;

        const distance = marquee.scrollWidth / 2;

        gsap.to(marquee, {
            x: `-=${distance}`,
            ease: "linear",
            duration: 30,
            repeat: -1,
        });
    }, []);

    return (
        <div className="overflow-hidden w-full py-6">
            <div className="flex gap-6 w-max" ref={marqueeRef}>
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                    <Card key={index} className="w-[30rem] h-[16rem] border-0">
                        <CardContent className="flex flex-col items-center justify-center text-center px-6 gap-6">
                            <p className="font-medium text-md">
                                {testimonial.feedback}
                            </p>

                            <div className="flex gap-3.5 items-center justify-center mt-3.5">
                                <img
                                    src={testimonial.profilePic}
                                    alt={testimonial.fullName}
                                    className="w-13 h-13 rounded-full object-cover"
                                />

                                <div className="flex flex-col justify-center items-start">
                                    <p className="font-semibold text-gray-500">
                                        {testimonial.fullName}
                                    </p>
                                    <p className="font-semibold text-gray-400">
                                        {testimonial.profession}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default CardGroup;