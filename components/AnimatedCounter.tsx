"use client"; // better to isolate function to use client
import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div className="w-full">
      <CountUp
        duration={2.75}
        decimal="."
        decimals={2}
        prefix="$ "
        end={amount}
        delay={0}
        enableScrollSpy={true}
      />
    </div>
  );
};

export default AnimatedCounter;
