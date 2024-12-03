import { useState } from "react";
import "./App.css";
import * as zebar from "zebar";
import {
  ArrowRightLeftIcon,
  ArrowUpDownIcon,
  BatteryMediumIcon,
  CalendarIcon,
  ClockIcon,
  CloudLightningIcon,
  CloudMoonIcon,
  CloudMoonRainIcon,
  CloudRain,
  CloudRainWindIcon,
  CloudyIcon,
  CpuIcon,
  MemoryStickIcon,
  MoonIcon,
  SnowflakeIcon,
  SunIcon,
} from "lucide-react";
import { StatusBadge } from "./features/status-badge/components/status-badge";

const providers = zebar.createProviderGroup({
  network: { type: "network" },
  glazewm: { type: "glazewm" },
  cpu: { type: "cpu" },
  date: { type: "date", formatting: "EEE d MMM t" },
  battery: { type: "battery" },
  memory: { type: "memory" },
  weather: { type: "weather" },
});

function App() {
  const [output, setOutput] = useState(providers.outputMap);
  providers.onOutput((outputMap) => setOutput(outputMap));

  return (
    <div className="bar">
      <div className="left">
        {output.glazewm && (
          <div className="workspaces">
            {output.glazewm.currentWorkspaces.map((workspace) => (
              <button
                className={`${workspace.hasFocus && "focused"}`}
                onClick={() =>
                  output.glazewm?.runCommand(
                    `focus --workspace ${workspace.name}`,
                  )
                }
                key={workspace.name}
              >
                {workspace.displayName ?? workspace.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="right">
        <div className="wm">
          {output.glazewm && (
            <>
              {output.glazewm.bindingModes.map((bindingMode) => (
                <button key={bindingMode.name}>
                  {bindingMode.displayName ?? bindingMode.name}
                </button>
              ))}

              <button
                onClick={() =>
                  output.glazewm?.runCommand("toggle-tiling-direction")
                }
              >
                {output.glazewm.tilingDirection === "horizontal" ? (
                  <ArrowRightLeftIcon size="1rem" />
                ) : (
                  <ArrowUpDownIcon size="1rem" />
                )}
              </button>
            </>
          )}
        </div>
        <div className="statuses">
          {output.cpu && (
            <StatusBadge color="red" icon={CpuIcon}>
              {Math.round(output.cpu?.usage)}%
            </StatusBadge>
          )}
          {output.battery && (
            <StatusBadge color="green" icon={BatteryMediumIcon}>
              {output.battery.chargePercent}%
            </StatusBadge>
          )}
          {output.memory && (
            <StatusBadge color="yellow" icon={MemoryStickIcon}>
              {Math.round(output.memory.usage)}%
            </StatusBadge>
          )}
          {output.weather && (
            <StatusBadge
              color="pink"
              icon={getWeatherIcon(output.weather.status)}
            >
              {Math.round(output.weather.celsiusTemp)}&deg;
            </StatusBadge>
          )}
          {output.date && (
            <>
              <StatusBadge color="teal" icon={CalendarIcon}>
                {formatDateToDDMM(output.date.new)}
              </StatusBadge>
              <StatusBadge color="blue" icon={ClockIcon}>
                {output.date.new.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </StatusBadge>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function getWeatherIcon(status: zebar.WeatherStatus) {
  switch (status) {
    case "snow_day":
    case "snow_night":
      return SnowflakeIcon;
    case "clear_day":
      return SunIcon;
    case "cloudy_day":
      return CloudyIcon;
    case "clear_night":
      return MoonIcon;
    case "thunder_day":
    case "thunder_night":
      return CloudLightningIcon;
    case "cloudy_night":
      return CloudMoonIcon;
    case "light_rain_day":
      return CloudRain;
    case "heavy_rain_day":
    case "heavy_rain_night":
      return CloudRainWindIcon;
    case "light_rain_night":
      return CloudMoonRainIcon;
  }
}

function formatDateToDDMM(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  return `${day}/${month}`;
}

export default App;
