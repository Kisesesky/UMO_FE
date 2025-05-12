export default function Header() {
    return (
      <header className="header">
        <nav className="nav">
          <img src="assets/logo/umo-face.png" alt="UMO Logo" width={90} height={40} className="logo" />
          <ul className="nav-menu">
            <li><a href="#">홈</a></li>
            <li><a href="#">서비스 소개</a></li>
            <li><a href="#">문의</a></li>
          </ul>
        </nav>
      </header>
    )
  }
  