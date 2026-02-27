import "./TopMenu.css"
import { useRef, useEffect, useState } from "react"
import { SettingsIco, LogoutIco, SingUpIcon } from "../Icons.jsx"
import RangeInput from "../newTask/rangeInput/RangeInput.jsx"
import { getLinearGradientCSS } from "../infra/utils.js"
import { AlarmIco, LogoutIco2 } from "../Icons.jsx"
import {
  useSettingsStore,
  useAlarmStore,
  useGoogleSSO,
  useAuthStore,
} from "../infra/customHooks"
const TopMenu = () => {
  return (
    <div>
      <div className='top-menu'>
        <Settings></Settings>
        <AuthCentre></AuthCentre>
      </div>
    </div>
  )
}
export default TopMenu

const AuthCentre = () => {
  const { isSignedIn, initialize, logout } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [])

  const googleSSOref = useRef()
  useGoogleSSO(googleSSOref)
  const controlRef = useRef()
  const [isActive, setIsActive] = useState(false)
  useEffect(() => {
    setIsActive(false)
  }, [isSignedIn])
  if (isSignedIn === null) {
    return (
      <div>
        <div className='spinner'></div>
      </div>
    )
  }
  const authConfig = {
    false: {
      icon: <SingUpIcon />,
      content: <div className='google-div' ref={googleSSOref}></div>,
      key: 2,
    },
    true: {
      icon: <LogoutIco />,
      content: (
        <div
          className='logout-btn'
          onClick={() => {
            logout()
            setIsActive(false)
          }}
        >
          Logout <LogoutIco2 />
        </div>
      ),
      key: 1,
    },
  }

  if (isSignedIn === null) {
    return <div className='spinner'></div>
  }
  const current = authConfig[isSignedIn]
  return (
    <>
      <button
        className={`nav-btn ${isActive ? "active" : ""}`}
        ref={controlRef}
        onClick={() => setIsActive(!isActive)} // Ensure you have a toggle!
      >
        {current.icon}
      </button>

      <DropDownFrame
        key={current.key}
        isActive={isActive}
        controllerRef={controlRef}
        setIsActive={setIsActive}
      >
        {current.content}
      </DropDownFrame>
    </>
  )
}

const Settings = () => {
  const { alarm, setVolume } = useAlarmStore()
  const { settings, setAllowNotifications } = useSettingsStore()
  const { allowNotification } = settings
  const [isActive, setIsActive] = useState(false)
  const settingsRef = useRef()
  const handleClick = () => {
    if (!allowNotification) {
      if (Notification.permission !== "granted") {
        Notification.requestPermission().then((decision) => {
          if (decision === "granted") setAllowNotifications(true)
        })
      } else setAllowNotifications(true)
    } else setAllowNotifications(false)
  }
  return (
    <>
      <button
        onClick={() => setIsActive(!isActive)}
        className={`nav-btn ${isActive && "active"}`}
        ref={settingsRef}
      >
        <SettingsIco></SettingsIco>
      </button>
      <DropDownFrame
        setIsActive={setIsActive}
        isActive={isActive}
        controllerRef={settingsRef}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Notification</p>
          <div className='toggle'>
            <div
              onClick={handleClick}
              className={`knob ${allowNotification && "active"}`}
            >
              <AlarmIco></AlarmIco>
            </div>
          </div>
        </div>
        <RangeInput
          inputName={"Alarm Volume"}
          value={Math.round(alarm.volume * 100)}
          handleChange={(e) => {
            setVolume(e.target.value / 100)
          }}
          style={{
            backgroundImage: getLinearGradientCSS(
              alarm.volume,
              "rgba(0,0,0,0)",
              "#2b2b29"
            ),
          }}
        ></RangeInput>
      </DropDownFrame>
    </>
  )
}
const DropDownFrame = ({ isActive, setIsActive, controllerRef, children }) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (controllerRef.current && !controllerRef.current?.contains(e.target)) {
        setIsActive(false)
      }
    }
    document.addEventListener("click", handleClick)
    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])
  return (
    <section
      onClick={(e) => {
        e.stopPropagation()
      }}
      className={`drop-down  ${isActive && "active"}`}
    >
      {children}
    </section>
  )
}
