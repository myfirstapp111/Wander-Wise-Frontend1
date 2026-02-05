import React from "react"
import { Card } from '@/components/ui/card'

export function StatCard({ label, value, icon, className }) {
  return (
    <Card className={`p-6 bg-linear-to-br from-slate-50 to-slate-100 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        {icon && (
          <div className="text-3xl text-gray-600">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}
