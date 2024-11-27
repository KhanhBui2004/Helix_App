/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./DashBoard.css";
import {
  getPosts,
  getUserByUsername,
  getUser,
} from "../../services/userService";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần
ChartJS.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const DashBoard = () => {
  const [User, setUser] = useState("");
  const [Post, setPost] = useState([]);
  const [dateTime, setDateTime] = useState(new Date());
  const [dailyPostCount, setDailyPostCount] = useState([]);
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filteredPosts, setFilteredPosts] = useState([]); // Dữ liệu sau khi lọc

  const fetchPost = async () => {
    let data = await getPosts();
    setPost(data.posts);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchUser = async () => {
    let response = await getUserByUsername("");
    setUser(response.users.length);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 60000); // Cập nhật mỗi phút

    return () => clearInterval(timer); // Xóa timer khi component bị unmount
  }, []);

  const filterByDate = (data, date) => {
    return data.filter((item) => {
      // Lấy phần ngày từ `created_at`
      const itemDate = new Date(item.created_at).toISOString().split("T")[0];
      return itemDate === date;
    });
  };

  const getDays = () => {
    const days = [];
    const start = new Date(beginDate);
    const end = new Date(endDate);

    // Tính hiệu số mili giây giữa hai ngày
    const diffTime = end - start;

    // Chuyển đổi mili giây thành số ngày
    const diffDays = diffTime / (1000 * 3600 * 24);
    for (let i = Math.floor(diffDays); i >= 0; i--) {
      const date = new Date(endDate);
      date.setDate(endDate.getDate() - i); // Lùi lại i ngày
      days.push(date.toISOString().split("T")[0]); // Định dạng YYYY-MM-DD
    }
    return days;
  };

  useEffect(() => {
    if (Post.length > 0) {
      const days = getDays();
      const counts = days.map((day) => {
        const filteredPosts = filterByDate(Post, day);
        return filteredPosts.length;
      });
      // console.log(counts);
      setDailyPostCount(counts);
    }
  }, [Post, beginDate, endDate]);

  const data = {
    labels: getDays(),
    datasets: [
      {
        label: "Posts per Day",
        data: dailyPostCount, // Dữ liệu mẫu
        fill: true,
        backgroundColor: "rgba(66, 133, 244, 0.1)", // Màu nền dưới đường
        borderColor: "#00bf63cf", // Màu đường
        pointBackgroundColor: "#00bf63cf", // Màu các điểm
      },
    ],
  };

  // Cấu hình biểu đồ
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value; // Hiển thị giá trị % trên trục Y
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Posts: ${context.raw}`; // Hiển thị giá trị % trong tooltip
          },
        },
      },
      legend: {
        display: false, // Ẩn nhãn "Post Details" ở trên cùng
      },
    },
  };

  return (
    <div className="container-sm mx-auto my-auto">
      <div className="Title">
        <h1>DashBoard</h1>
      </div>
      <div className="Total">
        <div className="Total_User">
          <div>
            <p>Total User</p>
            <h4>{User}</h4>
          </div>
          <i class="fa-solid fa-users fa-2x"></i>
        </div>
        <div className="Total_Post">
          <div>
            <p>Total Post</p>
            <h4>{Post.length}</h4>
          </div>
          <i class="fa-solid fa-cube fa-2x"></i>
        </div>
      </div>
      <div className="Post_Chart">
        <h3 className="Post_Details">Post Details</h3>
        <Line data={data} options={options} />
      </div>
      <div className="date-picker">
        <p>Chọn mốc thời gian: </p>
        <DatePicker
          selected={beginDate}
          onChange={(date) => setBeginDate(date)}
          dateFormat="yyyy-MM-dd"
          className="pickTime"
        />
        <p>đến</p>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
          className="pickTime"
        />
      </div>
    </div>
  );
};

export default DashBoard;
