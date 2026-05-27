'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Ticket,
  Search,
  Filter,
  MessageSquare,
  Clock,
  Check,
  User,
  Send,
  RefreshCw,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';

const translations = {
  en: {
    title: 'Support Tickets',
    subtitle: 'Manage customer support requests',
    search: 'Search tickets...',
    allStatus: 'All Status',
    allDepartments: 'All Departments',
    open: 'Open',
    inProgress: 'In Progress',
    waiting: 'Waiting',
    resolved: 'Resolved',
    closed: 'Closed',
    ticketId: 'Ticket ID',
    subject: 'Subject',
    department: 'Department',
    priority: 'Priority',
    status: 'Status',
    created: 'Created',
    lastReply: 'Last Reply',
    actions: 'Actions',
    reply: 'Reply',
    close: 'Close',
    reopen: 'Reopen',
    noTickets: 'No tickets found',
    total: 'Total',
    openTickets: 'Open',
    avgResponse: 'Avg. Response',
    technical: 'Technical',
    billing: 'Billing',
    sales: 'Sales',
    general: 'General',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
  },
  ar: {
    title: 'تذاكر الدعم',
    subtitle: 'إدارة طلبات دعم العملاء',
    search: 'بحث في التذاكر...',
    allStatus: 'جميع الحالات',
    allDepartments: 'جميع الأقسام',
    open: 'مفتوح',
    inProgress: 'قيد المعالجة',
    waiting: 'بانتظار العميل',
    resolved: 'تم الحل',
    closed: 'مغلق',
    ticketId: 'رقم التذكرة',
    subject: 'الموضوع',
    department: 'القسم',
    priority: 'الأولوية',
    status: 'الحالة',
    created: 'تاريخ الإنشاء',
    lastReply: 'آخر رد',
    actions: 'الإجراءات',
    reply: 'رد',
    close: 'إغلاق',
    reopen: 'إعادة فتح',
    noTickets: 'لا توجد تذاكر',
    total: 'الإجمالي',
    openTickets: 'مفتوحة',
    avgResponse: 'متوسط الاستجابة',
    technical: 'تقني',
    billing: 'فواتير',
    sales: 'مبيعات',
    general: 'عام',
    low: 'منخفض',
    medium: 'متوسط',
    high: 'عالي',
    urgent: 'عاجل',
  },
};

export default function AdminTicketsPage() {
  const params = useParams();
  const { toast } = useToast();
  const locale = params.locale as string || 'en';
  const t = translations[locale as keyof typeof translations];

  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    loadTickets();
  }, [statusFilter, departmentFilter]);

  const loadTickets = async () => {
    setLoading(true);
    try {
      let query = supabase.from('support_tickets').select('*').order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      if (departmentFilter !== 'all') {
        query = query.eq('department', departmentFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTicketMessages = async (ticketId: string) => {
    try {
      const { data, error } = await supabase
        .from('ticket_messages')
        .select('*')
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendReply = async () => {
    if (!selectedTicket || !replyText.trim()) return;

    setSendingReply(true);
    try {
      // Add message
      const { error: msgError } = await supabase.from('ticket_messages').insert({
        ticket_id: selectedTicket.id,
        message: replyText,
        is_staff: true,
        created_at: new Date().toISOString(),
      });

      if (msgError) throw msgError;

      // Update ticket status
      const { error: updateError } = await supabase
        .from('support_tickets')
        .update({
          status: 'waiting_customer',
          last_reply_at: new Date().toISOString(),
        })
        .eq('id', selectedTicket.id);

      if (updateError) throw updateError;

      setReplyText('');
      loadTicketMessages(selectedTicket.id);
      loadTickets();

      toast({
        title: locale === 'ar' ? 'تم الإرسال' : 'Sent',
        description: locale === 'ar' ? 'تم إرسال ردك بنجاح' : 'Your reply has been sent',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: locale === 'ar' ? 'حدث خطأ' : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setSendingReply(false);
    }
  };

  const updateTicketStatus = async (ticketId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('support_tickets')
        .update({ status: newStatus })
        .eq('id', ticketId);

      if (error) throw error;

      loadTickets();
      setSelectedTicket(null);
      toast({
        title: 'Success',
        description: locale === 'ar' ? 'تم تحديث الحالة' : 'Status updated',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: locale === 'ar' ? 'حدث خطأ' : 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  const viewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    loadTicketMessages(ticket.id);
  };

  const filteredTickets = tickets.filter(ticket => {
    if (!search) return true;
    return ticket.subject.toLowerCase().includes(search.toLowerCase());
  });

  const statusColors: Record<string, string> = {
    open: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    waiting_customer: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    closed: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  };

  const priorityColors: Record<string, string> = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-blue-100 text-blue-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800',
  };

  const stats = [
    { label: t.total, value: tickets.length },
    { label: t.openTickets, value: tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length },
    { label: 'Avg. Response', value: '< 5min' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold">{t.title}</h1>
        <p className="text-muted-foreground mt-1">{t.subtitle}</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Ticket className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t.search}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select
                  className="px-4 py-2 rounded-lg bg-muted border text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">{t.allStatus}</option>
                  <option value="open">{t.open}</option>
                  <option value="in_progress">{t.inProgress}</option>
                  <option value="waiting_customer">{t.waiting}</option>
                  <option value="resolved">{t.resolved}</option>
                </select>
                <select
                  className="px-4 py-2 rounded-lg bg-muted border text-sm"
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  <option value="all">{t.allDepartments}</option>
                  <option value="technical">{t.technical}</option>
                  <option value="billing">{t.billing}</option>
                  <option value="sales">{t.sales}</option>
                  <option value="general">{t.general}</option>
                </select>
                <Button size="icon" variant="outline" onClick={() => loadTickets()}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tickets List */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardContent className="p-4">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
              </div>
            ) : filteredTickets.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Ticket className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>{t.noTickets}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-4 rounded-lg border hover:border-primary/50 cursor-pointer transition-colors"
                    onClick={() => viewTicket(ticket)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm">#{ticket.id.toString().slice(0, 8)}</span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${priorityColors[ticket.priority]}`}>
                            {t[ticket.priority as keyof typeof t] || ticket.priority}
                          </span>
                        </div>
                        <div className="font-medium">{ticket.subject}</div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{t[ticket.department as keyof typeof t] || ticket.department}</span>
                          <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="text-end">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${statusColors[ticket.status]}`}>
                          {t[ticket.status as keyof typeof t] || ticket.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTicket(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-background rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">#{selectedTicket.id.toString().slice(0, 8)}</div>
                  <h3 className="text-lg font-bold">{selectedTicket.subject}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${statusColors[selectedTicket.status]}`}>
                      {t[selectedTicket.status as keyof typeof t]}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${priorityColors[selectedTicket.priority]}`}>
                      {t[selectedTicket.priority as keyof typeof t]}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {selectedTicket.status !== 'closed' && (
                    <Button size="sm" variant="outline" onClick={() => updateTicketStatus(selectedTicket.id, 'closed')}>
                      {t.close}
                    </Button>
                  )}
                  {selectedTicket.status === 'closed' && (
                    <Button size="sm" variant="outline" onClick={() => updateTicketStatus(selectedTicket.id, 'open')}>
                      {t.reopen}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 max-h-[40vh] overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`${msg.is_staff ? 'text-end' : 'text-start'}`}>
                  <div className={`inline-block p-3 rounded-lg ${msg.is_staff ? 'bg-primary text-background' : 'bg-muted'}`}>
                    {msg.message}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(msg.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={locale === 'ar' ? 'اكتب ردك...' : 'Type your reply...'}
                  className="flex-1 px-4 py-2 rounded-lg bg-muted border text-sm"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendReply()}
                />
                <Button onClick={sendReply} disabled={sendingReply || !replyText.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
