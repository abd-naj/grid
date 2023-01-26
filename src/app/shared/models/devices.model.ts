interface Device {
  deviceId: string;
  status: number;
  timestamp: string;
  type: 'thermometer' | 'pulse' | 'ECG' | 'pressure';
  userId: string
}
export interface ECGDevice extends  Device {
  heartRate: number;
  restRate: number;
}
export interface ThermometerDevice extends  Device {
  temperature: number;
}
export interface PulseDevice extends  Device {
  pulseRate: number;
  spO2: number;
}
export interface PressureDevice extends  Device {
  cuffPressure: number;
  highPressure: number;
  lowPressure: number;
  meanPressure: number;

}
