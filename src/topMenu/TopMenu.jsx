import "./TopMenu.css"
import { useRef, useEffect, useState } from "react"
import { SettingsIco, LogoutIco, SingUpIcon } from "../Icons.jsx"
import RangeInput from "../newTask/rangeInput/RangeInput.jsx"
import { getLinearGradientCSS } from "../infra/utils.js"
import { AlarmIco } from "../Icons.jsx"
import {
  useSettingsStore,
  useAlarmStore,
  useGoogleSSO,
  useAuthStore,
} from "../infra/customHooks"
const TopMenu = () => {
  return (
    <div>
      <div className="top-menu">
        <Settings></Settings>
        <AuthCentre></AuthCentre>
      </div>
    </div>
  )
}
export default TopMenu

const AuthCentre = () => {
  useGoogleSSO()
  const { isSignedIn } = useAuthStore()
  const googleSSOref = useRef()
  const controlRef = useRef()
  const [isActive, setIsActive] = useState(false)
  useEffect(() => {
    google.accounts.id.renderButton(
      googleSSOref.current,
      {
        theme: "filled_black",
        size: "medium",
        shape: "pill",
        type: "standard",
      } // customization attributes
    )
  }, [isSignedIn])

  return (
    <>
      {isSignedIn ? (
        <button className="nav-btn">
          <LogoutIco />
        </button>
      ) : (
        <>
          <button
            className={`nav-btn ${isActive && "active"}`}
            ref={controlRef}
          >
            <SingUpIcon></SingUpIcon>
          </button>
          <DropDownFrame
            isActive={isActive}
            controllerRef={controlRef}
            setIsActive={setIsActive}
          >
            <div className="google-div" ref={googleSSOref}></div>
          </DropDownFrame>
        </>
      )}
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
      <button className={`nav-btn ${isActive && "active"}`} ref={settingsRef}>
        <SettingsIco></SettingsIco>
      </button>
      <DropDownFrame
        setIsActive={setIsActive}
        isActive={isActive}
        controllerRef={settingsRef}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Notification</p>
          <div className="toggle">
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
      if (controllerRef.current?.contains(e.target)) {
        e.stopPropagation()
        setIsActive(!isActive)
      } else {
        setIsActive(false)
      }
    }
    document.addEventListener("click", handleClick)
    return () => {
      document.removeEventListener("click", () => handleClick)
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
