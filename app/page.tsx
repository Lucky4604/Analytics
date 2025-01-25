"use client"

import { Search, TrendingUp, TrendingDown, Activity, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { usageData } from "@/utils/data"





export default function AnalyticsDashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-white">Analytics Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-green-500/20 bg-gradient-to-r from-green-500/10 to-emerald-500/10 px-4 py-2">
              <div className="text-sm text-green-300">Available Credits</div>
              <div className="text-2xl font-bold text-green-400">$156.50</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="grid gap-6">
          {/* Stats Overview */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-indigo-200">Total Requests</CardTitle>
                <Activity className="h-4 w-4 text-indigo-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-indigo-300">4,200</div>
                <p className="text-xs text-indigo-400">
                  <TrendingUp className="inline h-4 w-4 text-green-400" /> +12.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-blue-200">Average Response Time</CardTitle>
                <Zap className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-300">245ms</div>
                <p className="text-xs text-blue-400">
                  <TrendingDown className="inline h-4 w-4 text-green-400" /> -18% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-purple-200">Success Rate</CardTitle>
                <Activity className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-300">99.8%</div>
                <p className="text-xs text-purple-400">
                  <TrendingUp className="inline h-4 w-4 text-green-400" /> +0.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-pink-200">Total Cost</CardTitle>
                <Activity className="h-4 w-4 text-pink-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-pink-300">$75.50</div>
                <p className="text-xs text-pink-400">
                  <TrendingUp className="inline h-4 w-4 text-red-400" /> +5.2% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Usage Details */}
          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-white">Usage Details</CardTitle>
              <div className="flex items-center gap-4">
                <Select defaultValue="january">
                  <SelectTrigger className="w-40 border-white/10 bg-white/5">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="january">January 2025</SelectItem>
                    <SelectItem value="february">February 2025</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
                  <Input placeholder="Search all columns..." className="w-64 border-white/10 bg-white/5 pl-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-white/70">Provider</TableHead>
                    <TableHead className="text-white/70">Model</TableHead>
                    <TableHead className="text-white/70">Requests</TableHead>
                    <TableHead className="text-white/70">Cost/Run</TableHead>
                    <TableHead className="text-white/70">Total Cost</TableHead>
                    <TableHead className="text-white/70">API Key</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usageData.map((row, index) => (
                    <TableRow key={index} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-medium text-white">{row.provider}</TableCell>
                      <TableCell className="text-white/70">{row.model}</TableCell>
                      <TableCell className="text-white/70">{row.requests.toLocaleString()}</TableCell>
                      <TableCell className="text-white/70">${row.costPerRun.toFixed(3)}</TableCell>
                      <TableCell className="text-white/70">${row.totalCost.toFixed(2)}</TableCell>
                      <TableCell className="font-mono text-sm text-white/70">{row.apiKey}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* API Usage Graph */}
          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-white">API Usage & Cost</CardTitle>
                <p className="text-sm text-white/70">Total Cost: $75.50</p>
              </div>
              <div className="flex items-center gap-4">
                <Select defaultValue="byMonth">
                  <SelectTrigger className="w-32 border-white/10 bg-white/5">
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="byMonth">By Month</SelectItem>
                    <SelectItem value="byWeek">By Week</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="january">
                  <SelectTrigger className="w-40 border-white/10 bg-white/5">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="january">January 2025</SelectItem>
                    <SelectItem value="february">February 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] rounded-lg border border-white/10 bg-gradient-to-b from-purple-500/10 to-blue-500/10 p-4">
                <APIUsageChart />
              </div>
            </CardContent>
          </Card>

          {/* Spend Analysis */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Spend by Provider */}
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-white">Spend by Provider</CardTitle>
                  <p className="text-sm text-white/70">Total Cost: $75.50</p>
                </div>
                <div className="flex items-center gap-4">
                  <Select defaultValue="january">
                    <SelectTrigger className="w-40 border-white/10 bg-white/5">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="january">January 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">OpenAI</span>
                      <span className="text-white">$37.50</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-full w-[50%] rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Anthropic</span>
                      <span className="text-white">$17.00</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-full w-[23%] rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Google</span>
                      <span className="text-white">$21.00</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-full w-[27%] rounded-full bg-gradient-to-r from-pink-500 to-rose-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Spend by Model */}
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-white">Spend by Model</CardTitle>
                  <p className="text-sm text-white/70">Total Cost: $75.50</p>
                </div>
                <div className="flex items-center gap-4">
                  <Select defaultValue="january">
                    <SelectTrigger className="w-40 border-white/10 bg-white/5">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="january">January 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">GPT-4</span>
                      <span className="text-white">$37.50</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-full w-[50%] rounded-full bg-gradient-to-r from-indigo-500 to-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Claude 2</span>
                      <span className="text-white">$17.00</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-full w-[23%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Gemini Pro</span>
                      <span className="text-white">$21.00</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-full w-[27%] rounded-full bg-gradient-to-r from-cyan-500 to-teal-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

function APIUsageChart() {
  interface APIUsageData {
    day: number;
    requests: number;
    cost: string;
  }
  
  const [data, setData] = useState<APIUsageData[]>([])

  useEffect(() => {
    const generateData = () => {
      const newData = []
      for (let i = 1; i <= 30; i++) {
        newData.push({
          day: i,
          requests: Math.floor(Math.random() * 1000) + 500,
          cost: (Math.random() * 10 + 5).toFixed(2),
        })
      }
      setData(newData)
    }

    generateData()
    const interval = setInterval(generateData, 5000) 

    return () => clearInterval(interval)
  }, [])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
        <YAxis yAxisId="left" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="rgba(255,255,255,0.5)"
          tick={{ fill: "rgba(255,255,255,0.5)" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(0,0,0,0.8)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "4px",
          }}
          itemStyle={{ color: "rgba(255,255,255,0.8)" }}
          labelStyle={{ color: "rgba(255,255,255,0.5)" }}
        />
        <Line
          type="monotone"
          dataKey="requests"
          stroke="rgba(129,140,248,0.8)"
          strokeWidth={2}
          dot={false}
          yAxisId="left"
          animationDuration={500}
        />
        <Line
          type="monotone"
          dataKey="cost"
          stroke="rgba(236,72,153,0.8)"
          strokeWidth={2}
          dot={false}
          yAxisId="right"
          animationDuration={500}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

