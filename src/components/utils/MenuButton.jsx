import { motion as Motion } from "framer-motion";

const MenuBtn = ({ isMenuOpen, toggleMenu, springX, springY }) => {
  return (
    <Motion.div
      className={`menu-toggle ${isMenuOpen ? "opened" : "closed"} bg-transparent shadow-xs shadow-accent/50`}
      onClick={toggleMenu}
      style={{
        x: springX,
        y: springY,
      }}
    >
      <div className="menu-toggle-icon bg-accent shadow-xs shadow-accent/50">
        <div className="hamburger">
          <div className="menu-bar bg-surface/50" data-position="top"></div>
          <div className="menu-bar bg-surface/50" data-position="bottom"></div>
        </div>
      </div>
      <div className="menu-copy">
        <p className="font-bold text-sm uppercase">Meniu</p>
      </div>
    </Motion.div>
  );
};

export default MenuBtn;
