"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./dashboard.module.css";
import Button from "@/ui/components/Button";
import { useStore } from "@/context/StoreContext";

import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import { enGB } from "date-fns/locale";
import "react-nice-dates/build/style.css";

export default function Dashboard() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const router = useRouter();
  const { isSystemBlocked, setIsSystemBlocked } = useStore();

  const toggleSystemBlock = () => {
    setIsSystemBlocked((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      {/* Top Section */}
      <div className={styles.topSection}>
        <div className={styles.managerInfo}>
          <img
            src="/manager.png"
            alt="Manager"
            className={styles.managerPicture}
          />
          <div className={styles.managerName}>Natacha Malychev</div>
        </div>
        <div className={styles.topButtons}>
          <Button
            className={`${styles.blockButton} ${
              isSystemBlocked ? styles.unblockButton : ""
            }`}
            onClick={toggleSystemBlock}
          >
            {isSystemBlocked ? "Unblock the system" : "Block the system"}
          </Button>
          <Button
            className={styles.logoutButton}
            onClick={() => router.push("/")}
          >
            Log out
          </Button>
        </div>
      </div>

      <hr className={styles.separator} />

      {/* Dashboard Title and Date Range */}
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Dashboard</h1>
        <div className={styles.dateRange}>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            minimumLength={1}
            format="dd MMM yyyy"
            locale={enGB}
          >
            {({ startDateInputProps, endDateInputProps, focus }) => (
              <div className={styles.dateRangePicker}>
                <h2 className={styles.dateRangeTitle}>Select Date Range</h2>
                <input
                  className={
                    styles.input + (focus === START_DATE ? ` ${styles.focused}` : "")
                  }
                  {...startDateInputProps}
                  placeholder="Start date"
                />
                <span className={styles.dateRangeArrow}>→</span>
                <input
                  className={
                    styles.input + (focus === END_DATE ? ` ${styles.focused}` : "")
                  }
                  {...endDateInputProps}
                  placeholder="End date"
                />
              </div>
            )}
          </DateRangePicker>
        </div>
      </div>

      {/* Statistics Section */}
      <div className={styles.statistics}>
        <div className={styles.statBox}>
          <h2>Average Sales Price</h2>
          <p>{(endDate == null || startDate == null) ? "-" : "43.76 €"}</p>
        </div>
        <div className={styles.statBox}>
          <h2>Total Sales</h2>
          <p>{(endDate == null || startDate == null) ? "-" : "467"}</p>
        </div>
        <div className={styles.statBox}>
          <h2>Total Revenue</h2>
          <p>{(endDate == null || startDate == null) ? "-" : "20,435 €"}</p>
        </div>
      </div>

      {/* Graphs and Tables Section */}
      <div className={styles.graphsAndTables}>
        {/* Graph */}
        <div className={styles.graph}>
          <h2>Period Revenue</h2>
          <img
            src="/lineChart.png"
            alt="Line Chart 1"
            className={styles.graphImage}
            style={{
              display: endDate == null || startDate == null ? "none" : "block",
            }}
          />
          <img
            src="/lineChart2.png"
            alt="Line Chart 2"
            className={styles.graphImage}
            style={{
              display: endDate == null || startDate == null ? "none" : "block",
            }}
          />
        </div>

        {/* Round Diagram */}
        <div className={styles.paymentMethods}>
          <h2>Payment Methods</h2>
          <img
            src="/pieChart.png"
            alt="Pie Chart"
            style={{
              display: endDate == null || startDate == null ? "none" : "block",
            }}
          />
        </div>

        {/* Top Selling Items Table */}
        <div className={styles.topSelling}>
          <h2>Top Selling Items</h2>
          <table className={styles.table}
          style={{
            display: endDate == null || startDate == null ? "none" : "table",
          }}
          >
            <thead>
              <tr>
                <th>Item</th>
                <th>Sold</th>
                <th>Total Sales</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lipton Peach Black Tea</td>
                <td>100</td>
                <td>€345</td>
              </tr>
              <tr>
                <td>Cristalline</td>
                <td>521</td>
                <td>€234</td>
              </tr>
              <tr>
                <td>Choco Milk</td>
                <td>34</td>
                <td>€119</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}