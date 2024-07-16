import React from "react";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSideBar from "@/components/RightSIdeBar";

const Home = () => {
  const loggedIn = {
    firstName: "Alden",
    lastName: "Sahi",
    email: "axs9247@gmail.com",
  };

  return (
    // *NOT A NATIVE TAILWIND CLASS
    // We can see in globals.css attributes applied!
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext=" Access and manage your account and transactions efficiently"
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>

      <RightSideBar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 125.50 }, { currentBalance: 155.5 }]}
      />
    </section>
  );
};

export default Home;
