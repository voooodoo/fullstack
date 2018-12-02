export interface Analytics {
  average: number;
  chart: AnalyticsItem[];
}

export interface AnalyticsItem {
  gain: number;
  order: number;
  label: string;
}
