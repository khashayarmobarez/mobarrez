"use client"; // Client component due to interactivity


const NavbarSwitch = ({classname}) => {
  return (
    <div className={classname}>
        <input id="checkbox" type="checkbox" />
        <label className="toggle" htmlFor="checkbox">
          <div className="bar bar--top" />
          <div className="bar bar--middle" />
          <div className="bar bar--bottom" />
        </label>

      <style jsx>{`
        #checkbox {
            display: none;
        }

        .toggle {
            position: relative;
            width: 40px;
            cursor: pointer;
            margin: auto;
            display: block;
            height: 2.2rem;
            border: none;
        }

        .bar {
            position: absolute;
            left: 0;
            right: 0;
            height: 1px;
            border-radius: calc(4px / 2);
            background: var(--foreground);
            color: inherit;
            opacity: 1;
            transition: none 0.35s cubic-bezier(.5,-0.35,.35,1.5) 0s;
        }

        /***** Tornado Animation *****/

        .bar--top {
            bottom: calc(50% + 11px + 4px/ 2);
            transition-property: bottom,transform;
            transition-delay: calc(0s + 0.35s) * .6;
        }

        .bar--middle {
            top: 12px;
            transition-property: opacity,transform;
            transition-delay: calc(0s + 0.35s * .3);
        }

        .bar--bottom {
            top: 24px;
            transition-property: top,transform;
            transition-delay: 0s;
            rotate: 0deg;
        }

        #checkbox:checked + .toggle .bar--top {
            transform: rotate(-135deg);
            transition-delay: 0s;
            bottom: calc(50% - 4px/ 2);
        }

        #checkbox:checked + .toggle .bar--middle {
            opacity: 0;
            transform: rotate(-135deg);
            transition-delay: calc(0s + 0.35s * .3);
        }

        #checkbox:checked + .toggle .bar--bottom {
            top: calc(50% - 4px/ 2);
            transform: rotate(-225deg);
            transition-delay: calc(0s + 0.35s * .6);
        }
      `}</style>
    </div>
  );
};

export default NavbarSwitch;