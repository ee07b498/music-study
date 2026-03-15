'use client';

import { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CreditCard, DollarSign, Clock, CheckCircle, AlertCircle,
  Receipt, Wallet, Info,
} from 'lucide-react';

// --- Types ---
type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'refunded';

interface Payment {
  id: number;
  date: string;
  description: string;
  amount: string;
  status: PaymentStatus;
  method: string;
}

// --- Mock Data ---
const payments: Payment[] = [
  { id: 1, date: 'Mar 10, 2026', description: '10 Lesson Credits — Guzheng Package', amount: '$650.00', status: 'paid', method: 'Bank Transfer' },
  { id: 2, date: 'Feb 15, 2026', description: 'Erhu Beginner Course — 8 Lessons', amount: '$480.00', status: 'paid', method: 'Bank Transfer' },
  { id: 3, date: 'Feb 1, 2026', description: 'Registration Fee', amount: '$50.00', status: 'paid', method: 'Cash' },
  { id: 4, date: 'Jan 20, 2026', description: '5 Lesson Credits — Pipa Trial', amount: '$300.00', status: 'paid', method: 'Bank Transfer' },
  { id: 5, date: 'Mar 15, 2026', description: 'Guzheng Grade 5 Exam Fee', amount: '$120.00', status: 'pending', method: '—' },
  { id: 6, date: 'Dec 5, 2025', description: 'Lesson Cancellation Refund', amount: '$65.00', status: 'refunded', method: 'Bank Transfer' },
];

const balance = {
  outstanding: '$120.00',
  totalPaid: '$1,480.00',
  nextDue: 'Mar 20, 2026',
};

const statusStyles: Record<PaymentStatus, { label: string; className: string; icon: typeof CheckCircle }> = {
  paid: { label: 'Paid', className: 'bg-green-100 text-green-700', icon: CheckCircle },
  pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-700', icon: Clock },
  overdue: { label: 'Overdue', className: 'bg-red-100 text-red-700', icon: AlertCircle },
  refunded: { label: 'Refunded', className: 'bg-blue-100 text-blue-700', icon: Receipt },
};

export default function StudentPaymentsPage() {
  const [loading] = useState(false);

  if (loading) {
    return (
      <DashboardShell role="student" userName="Student Name">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Loading payments...</p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell role="student" userName="Emily Chen">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payment History</h1>
          <p className="mt-1 text-muted-foreground">
            View your payment records and outstanding balances.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                <DollarSign className="size-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Outstanding</p>
                <p className="text-xl font-bold text-foreground">{balance.outstanding}</p>
                <p className="text-xs text-muted-foreground">Due by {balance.nextDue}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                <Wallet className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-xl font-bold text-foreground">{balance.totalPaid}</p>
                <p className="text-xs text-muted-foreground">All time</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lesson Credits</p>
                <p className="text-xl font-bold text-foreground">12 remaining</p>
                <p className="text-xs text-muted-foreground">Expires Jun 30, 2026</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Online Payment Notice */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-start gap-3 p-4">
            <Info className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold text-foreground">Coming Soon — Online Payment</p>
              <p className="mt-1 text-sm text-muted-foreground">
                We are working on integrating online payment options including credit card and
                WeChat Pay. Currently, payments can be made via bank transfer or cash at the
                school office. Contact us at{' '}
                <span className="font-medium text-foreground">payments@miyamusic.com</span>{' '}
                for any questions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment History Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Transaction History</CardTitle>
            <CardDescription>All payment records for your account</CardDescription>
          </CardHeader>
          <CardContent>
            {payments.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <Receipt className="mx-auto mb-3 size-10 text-muted-foreground/50" />
                <p>No payment records found.</p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden sm:block">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-left">
                          <th className="pb-3 pr-4 font-medium text-muted-foreground">Date</th>
                          <th className="pb-3 pr-4 font-medium text-muted-foreground">Description</th>
                          <th className="pb-3 pr-4 font-medium text-muted-foreground">Method</th>
                          <th className="pb-3 pr-4 text-right font-medium text-muted-foreground">Amount</th>
                          <th className="pb-3 text-right font-medium text-muted-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((payment) => {
                          const style = statusStyles[payment.status];
                          return (
                            <tr key={payment.id} className="border-b last:border-0">
                              <td className="py-3 pr-4 text-muted-foreground">{payment.date}</td>
                              <td className="py-3 pr-4 font-medium text-foreground">
                                {payment.description}
                              </td>
                              <td className="py-3 pr-4 text-muted-foreground">{payment.method}</td>
                              <td className="py-3 pr-4 text-right font-medium text-foreground">
                                {payment.status === 'refunded' ? (
                                  <span className="text-blue-600">+{payment.amount}</span>
                                ) : (
                                  payment.amount
                                )}
                              </td>
                              <td className="py-3 text-right">
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${style.className}`}
                                >
                                  {style.label}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile List */}
                <div className="space-y-0 sm:hidden">
                  {payments.map((payment, index) => {
                    const style = statusStyles[payment.status];
                    return (
                      <div key={payment.id}>
                        {index > 0 && <Separator className="my-3" />}
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-medium text-foreground">{payment.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {payment.date} &middot; {payment.method}
                            </p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="font-medium text-foreground">
                              {payment.status === 'refunded' ? `+${payment.amount}` : payment.amount}
                            </p>
                            <span
                              className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${style.className}`}
                            >
                              {style.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
