import Card from "../ui/dashboard/card/card";
import Card2 from "../ui/dashboard/card/card2";
import Card3 from "../ui/dashboard/card/card3";
import Chart from "../ui/dashboard/chart/chart";
import Chart2 from "../ui/dashboard/chart/chart2";
import Chart3 from "../ui/dashboard/chart/chart3";
import Chart4 from "../ui/dashboard/chart/chart4";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";

const Dashboard = () => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card />
          <Card2 />
          <Card3 />
        </div>
        <div className={styles.secondRow}>
          <div className={styles.firstChart}>
            <Chart2 />
          </div>
          <div className={styles.secondChart}>
            <Chart />
          </div>
        </div>
        <div className={styles.thirdRow}>
          <div className={styles.firstChart}>
            <Chart3 />
          </div>
          <div className={styles.secondChart}>
            <Chart4 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;