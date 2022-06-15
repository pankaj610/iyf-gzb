import React from "react";
import FooterComponent from "../../components/Footer";
import "./style.scss";

const UmangContainer = () => {
  return (
    <div>
      <div className="umang-landing-page">
        <div className="banner">
           <video className="umang-bg-video" playsInline muted loop autoPlay width="100%">
        <source src="https://res.cloudinary.com/dnuq1lgqs/video/upload/v1610357653/Umang_y3rb3k.mp4" type="video/mp4"/>
        Your browser does not support HTML5 video.
        </video>
          <div className="banner-overlay">
            <div className="title">UTSAH 2022</div>
            <div className="line-1">Ray of Hope...</div>
            <div className="line-2">
              15 August  2022 / ISKCON GHAZIABAD / 3 PM ONWARDS
            </div>
            <a
              href="https://cutt.ly/registerNow"
              target="_blank"
              rel="noreferrer"
            >
              <button
                className="register-btn round-btn"
                style={{
                  backgroundcolor: "transparent",
                  color: "rgb(255, 255, 255)",
                  border: "2px solid rgb(255, 255, 255)",
                }}
              >
                REGISTER NOW
              </button>
            </a>
          </div>
        </div>
        <div className="about-container">
          <div className="about-1">
            <div className="title">About the Fest</div>
            <div className="desc">
              <p>
                UTSAH is the thematic annual youth fest of IYF Ghaziabad
                and is expected to be participated by 500+ youths. The festival
                would project Rock music band, Quiz with exciting prizes,
                Motivational talks by leading personalities, Panel Discussion on
                current issues and full Dinner Buffet for all the participants.
                It will be attended by several institute directors, faculties.
                artists, and scholars from all across Delhi/NCR.
              </p>
            </div>
          </div>
          <div className="about-2">
            <div className="details">
              <div className="heading">THEME</div>
              <div className="detail">
                5 Life Changing Lessons from Bhagavad Gita
              </div>
              <div className="heading">WHERE</div>
              <div className="detail">
                <a
                  href="https://goo.gl/maps/VRvoocp5mfuYDFKD8"
                  target="_blank"
                  rel="noreferrer"
                >
                  ISKCON GHAZIABAD
                </a>
              </div>
              <div className="heading">WHEN</div>
              <div className="detail"> 15 August 2022</div>
            </div>
            <div className="poster">
              <img src="https://res.cloudinary.com/xyzttt/image/upload/v1654711498/WhatsApp_Image_2022-06-08_at_11.33.20_PM_yihv4f.jpg" />
            </div>
          </div>
        </div>
        <div className="event-container">
          <div className="title">Events.</div>
          <div className="event-cards">
            <div
              className="card"
              style={{
                background:
                  "linear-gradient(rgba(29, 33, 82, 0.667) 80%, rgba(29, 33, 82, 0.667) 80%) no-repeat, url('https://iyfdelhi.com/wp-content/uploads/2013/06/shutterstock_314450846.jpg') center center / cover no-repeat",
              }}
            >
              <div className="detail">
                <div className="heading">Enlightening Talk</div>
                <div className="desc-1">HG Ram bhadra Das</div>
                <div className="desc-2">
                  Founder, Siksharthakam Educator Community
                </div>
                <div className="desc-2">M. Tech. IIT Kharagpur</div>
              </div>
            </div>
            <div
              className="card"
              style={{
                background:
                  "linear-gradient(rgba(29, 33, 82, 0.667) 80%, rgba(29, 33, 82, 0.667) 80%) no-repeat, url('https://static.toiimg.com/photo/msid-76158920/76158920.jpg') center center / cover no-repeat",
              }}
            >
              <div className="detail">
                <div className="heading">Theatrical Performance</div>
                <div className="desc-2">
                  which broadcasts a strong relevant message.
                </div>
              </div>
            </div>
            <div
              className="card"
              style={{
                background:
                  "linear-gradient(rgba(29, 33, 82, 0.667) 80%, rgba(29, 33, 82, 0.667) 80%) no-repeat, url('https://res.cloudinary.com/dnuq1lgqs/image/upload/v1610437180/headway-5QgIuuBxKwM-unsplash_1_dl1n31.jpg') center center / cover no-repeat",
              }}
            >
              <div className="detail">
                <div className="heading">Panel Discussion</div>
                <div className="desc-2">Seedhi Baat ISKCON ke Saath</div>
              </div>
            </div>
            <div
              className="card"
              style={{
                background:
                  "linear-gradient(rgba(29, 33, 82, 0.667) 80%, rgba(29, 33, 82, 0.667) 80%) no-repeat, url('https://res.cloudinary.com/dnuq1lgqs/image/upload/v1644671842/Event-Organisers-For-Game-Show_tgzcqy.jpg') center center / cover no-repeat",
              }}
            >
              <div className="detail">
                <div className="heading">Vedic Quiz</div>
                <div className="desc-2">
                  Participate in Vedic Quiz &amp; Win Exciting Prizes
                </div>
              </div>
            </div>
            <div
              className="card"
              style={{
                background:
                  "linear-gradient(rgba(29, 33, 82, 0.667) 80%, rgba(29, 33, 82, 0.667) 80%) no-repeat, url('https://res.cloudinary.com/dnuq1lgqs/image/upload/v1644671180/pexels-wesley-carvalho-3622614_wezym7.jpg') center center / cover no-repeat",
              }}
            >
              <div className="detail">
                <div className="heading">Talent Hunt</div>
                <div className="desc-2">
                  Showcase your Talent &amp; Win Exciting Prizes
                </div>
              </div>
            </div>
            <div
              className="card"
              style={{
                background:
                  "linear-gradient(rgba(29, 33, 82, 0.667) 80%, rgba(29, 33, 82, 0.667) 80%) no-repeat, url('https://cdn.statically.io/img/www.kworldnow.com/f=auto/wp-content/uploads/2020/07/man-playing-guitar-811838.jpg') center center / cover no-repeat",
              }}
            >
              <div className="detail">
                <div className="heading">Mantra Rock Dance</div>
                <div className="desc-2">Get your heads a little higher!</div>
              </div>
            </div>
            <div
              className="card"
              style={{
                background:
                  "linear-gradient(rgba(29, 33, 82, 0.667) 80%, rgba(29, 33, 82, 0.667) 80%) no-repeat, url('https://www.daysoftheyear.com/wp-content/uploads/national-fast-food-day.jpg') center center / cover no-repeat",
              }}
            >
              <div className="detail">
                <div className="heading">Dinner Buffet</div>
                <div className="desc-2">
                  We bet, you'll never forget the taste!
                </div>
              </div>
            </div>
            <div
              className="card"
              style={{
                background:
                  "linear-gradient(rgba(29, 33, 82, 0.667) 80%, rgba(29, 33, 82, 0.667) 80%) no-repeat, url('https://iyfdelhi.com/wp-content/uploads/2013/06/shutterstock_612941954.jpg') center center / cover no-repeat",
              }}
            >
              <div className="detail">
                <div className="heading">Lots of Fun</div>
                <div className="desc-2">Music! Dance! FOOD!!</div>
              </div>
            </div>
          </div>
        </div>
        <div className="fest-details">
          <div className="part">
            <div className="up-title">THEME</div>
            <div className="title">5 Life Lessons from Bhagavad Gita</div>
            <p className="para">
              Once titled Golden Bird, Vishwa Guru, India has now come way ahead
              only to realize that the paradise is lost. The countless glories
              that embellished Indian historical era are now a part of textbooks
              only. Let us become instrumental in excavating and reviving the
              lost grandeur of our ancient tradition. Let us discover,
              understand, preserve and promote the glories of Vedic Culture.
            </p>
          </div>
          <div className="part poster">
            <img src="https://res.cloudinary.com/dnuq1lgqs/image/upload/v1626932442/Daily_Nuggets_14_pkwgau.jpg" />
          </div>
        </div>
        <div className="action-container">
          <div className="plate-1">
            <div className="title">Grab your ticket now!</div>
            <p className="grey">
              Dont miss this great opportunity else you miss yourself.
            </p>
            <p className="red">Hurry up! Limited Seats!</p>
          </div>
          <div className="plate-2">
            <div className="heading">Full Access</div>
            <div className="price">₹100/-</div>
            <ul className="features">
              <li>Seminar</li>
              <li>Debate</li>
              <li>Vedic Quiz</li>
              <li>Mantra Rock Show</li>
              <li>Theatre</li>
              <li>Dinner Buffet</li>
            </ul>
            <a
              href="https://cutt.ly/registerNow"
              target="_blank"
              rel="noreferrer"
              className="purchase"
            >
              <button>Purchase Ticket</button>
            </a>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default UmangContainer;
