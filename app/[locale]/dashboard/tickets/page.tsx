'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ticket, Plus, MessageCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { format } from 'date-fns';
import Link from 'next/link';

interface Ticket {
  id: string;
  subject: string;
  status: string;
  priority: string;
  department: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  open: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  answered: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  closed: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
};

const priorityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  low: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
};

export default function TicketsPage() {
  const t = useTranslations();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: '', message: '', priority: 'medium', department: 'general' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setTickets(data);
      }
      setLoading(false);
    };

    fetchTickets();
  }, []);

  const handleCreateTicket = async () => {
    if (!newTicket.subject || !newTicket.message) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    setSubmitting(true);
    try {
      const { data: ticket, error: ticketError } = await supabase
        .from('support_tickets')
        .insert({
          user_id: session.user.id,
          subject: newTicket.subject,
          priority: newTicket.priority,
          department: newTicket.department,
          status: 'open',
        })
        .select('id')
        .single();

      if (ticketError) throw ticketError;

      // Add first message
      await supabase.from('ticket_messages').insert({
        ticket_id: ticket.id,
        user_id: session.user.id,
        message: newTicket.message,
        is_staff: false,
      });

      // Refresh tickets
      const { data } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (data) setTickets(data);
      setShowNewForm(false);
      setNewTicket({ subject: '', message: '', priority: 'medium', department: 'general' });
    } catch (error) {
      console.error('Error creating ticket:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t('dashboard.tickets.title')}</h1>
          <p className="text-muted-foreground">Manage your support tickets</p>
        </div>
        <Button className="gap-2" onClick={() => setShowNewForm(true)}>
          <Plus className="h-4 w-4" />
          New Ticket
        </Button>
      </div>

      {showNewForm && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Brief description of your issue"
                value={newTicket.subject}
                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={newTicket.department}
                  onChange={(e) => setNewTicket({ ...newTicket, department: e.target.value })}
                >
                  <option value="general">General</option>
                  <option value="technical">Technical</option>
                  <option value="billing">Billing</option>
                  <option value="abuse">Abuse</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md min-h-[120px]"
                placeholder="Describe your issue in detail..."
                value={newTicket.message}
                onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateTicket} disabled={submitting}>
                {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Create Ticket
              </Button>
              <Button variant="outline" onClick={() => setShowNewForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {tickets.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Ticket className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">{t('dashboard.tickets.empty')}</h3>
            <p className="text-muted-foreground mb-4">You haven't created any support tickets yet.</p>
            <Button onClick={() => setShowNewForm(true)}>Create Ticket</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {tickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-muted">
                        <Ticket className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={statusColors[ticket.status] || ''} variant="secondary">
                            {ticket.status}
                          </Badge>
                          <Badge className={priorityColors[ticket.priority] || ''} variant="secondary">
                            {ticket.priority}
                          </Badge>
                        </div>
                        <h3 className="font-semibold">{ticket.subject}</h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                      </div>
                      <div>{ticket.created_at ? format(new Date(ticket.created_at), 'MMM d, yyyy') : '-'}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
