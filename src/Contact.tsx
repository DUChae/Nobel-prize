import React from "react";

function Contact() {
  return (
    <section id="contact" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.headerArea}>
          <div style={styles.line}></div>
          <h2 style={styles.mainTitle}>Let's Connect</h2>
          <p style={styles.description}>
            데이터의 가치를 발견하는 즐거움을 함께 나누고 싶습니다.
            <br />
            프로젝트에 대한 피드백이나 협업 제안은 언제나 환영입니다.
          </p>
        </div>

        <div style={styles.contactWrapper}>
          {/* Email Link */}
          <a
            href="mailto:sangdyjjang@naver.com"
            style={styles.linkItem}
            className="contact-link"
          >
            <svg
              style={styles.svgIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span style={styles.linkText}>your-email@gmail.com</span>
          </a>

          {/* GitHub Link */}
          <a
            href="https://github.com/DUChae"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.linkItem}
            className="contact-link"
          >
            <svg
              style={styles.svgIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <span style={styles.linkText}>github.com/DUChae</span>
          </a>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>Designed & Developed by Jihoon Chae</p>
        </div>
      </div>
    </section>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    padding: "120px 0 80px",
    backgroundColor: "#ffffff",
    textAlign: "center",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "0 24px",
  },
  headerArea: {
    marginBottom: "80px",
  },
  line: {
    width: "40px",
    height: "2px",
    backgroundColor: "#C5A059", // 노벨 골드
    margin: "0 auto 24px",
  },
  mainTitle: {
    fontSize: "2.8rem",
    fontWeight: 800,
    color: "#111",
    letterSpacing: "-0.02em",
    marginBottom: "20px",
  },
  description: {
    fontSize: "1.1rem",
    color: "#666",
    lineHeight: "1.8",
  },
  contactWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  linkItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "18px 30px",
    borderRadius: "100px",
    textDecoration: "none",
    color: "#111",
    border: "1px solid #eaeaea",
    transition: "all 0.3s ease",
    width: "fit-content",
  },
  svgIcon: {
    width: "22px",
    height: "22px",
    color: "#C5A059",
  },
  linkText: {
    fontSize: "1.1rem",
    fontWeight: 500,
  },
  footer: {
    marginTop: "120px",
    borderTop: "1px solid #f0f0f0",
    paddingTop: "30px",
  },
  footerText: {
    fontSize: "0.9rem",
    color: "#999",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
};

export default Contact;
