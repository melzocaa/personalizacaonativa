import { useMemo, useState } from 'react'
import { LayoutDashboard, ListTodo, CalendarDays, Settings, Search, Plus, Clock3, Flag, Check, Menu, X, Trash2, Pencil, ChevronDown } from 'lucide-react'

const initialTasks = [
  { id: 1, title: 'Finalizar apresentação de projeto', project: 'Faculdade', date: 'Hoje', priority: 'Alta', status: 'Em andamento' },
  { id: 2, title: 'Revisar conteúdo de matemática', project: 'Estudos', date: 'Hoje', priority: 'Média', status: 'A fazer' },
  { id: 3, title: 'Organizar referências e imagens', project: 'Projeto pessoal', date: 'Amanhã', priority: 'Baixa', status: 'A fazer' },
  { id: 4, title: 'Enviar atividade de programação', project: 'Faculdade', date: 'Ontem', priority: 'Alta', status: 'Concluída' },
]
const columns = ['A fazer', 'Em andamento', 'Concluída']
const projectColors = { Faculdade: 'bg-violet-50 text-violet-700', Estudos: 'bg-pink-50 text-pink-700', 'Projeto pessoal': 'bg-amber-50 text-amber-700', Pessoal: 'bg-emerald-50 text-emerald-700' }

function App() {
  const [tasks, setTasks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('taskflow-tasks')) || initialTasks } catch { return initialTasks }
  })
  const [active, setActive] = useState('Visão geral')
  const [query, setQuery] = useState('')
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [form, setForm] = useState({ title: '', project: 'Faculdade', date: 'Hoje', priority: 'Média', status: 'A fazer' })

  const updateTasks = (updater) => setTasks(current => {
    const next = typeof updater === 'function' ? updater(current) : updater
    localStorage.setItem('taskflow-tasks', JSON.stringify(next))
    return next
  })
  const done = tasks.filter(t => t.status === 'Concluída').length
  const inProgress = tasks.filter(t => t.status === 'Em andamento').length
  const progress = tasks.length ? Math.round(done / tasks.length * 100) : 0
  const filtered = useMemo(() => tasks.filter(t => `${t.title} ${t.project}`.toLowerCase().includes(query.toLowerCase())), [tasks, query])
  const openNew = () => { setEditing(null); setForm({ title: '', project: 'Faculdade', date: 'Hoje', priority: 'Média', status: 'A fazer' }); setModal(true) }
  const editTask = task => { setEditing(task.id); setForm({ title: task.title, project: task.project, date: task.date, priority: task.priority, status: task.status }); setModal(true) }
  const saveTask = e => {
    e.preventDefault()
    if (!form.title.trim()) return
    if (editing) updateTasks(list => list.map(t => t.id === editing ? { ...t, ...form } : t))
    else updateTasks(list => [{ ...form, id: Date.now() }, ...list])
    setModal(false)
  }
  const today = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())
  const nav = [{ label: 'Visão geral', icon: LayoutDashboard }, { label: 'Minhas tarefas', icon: ListTodo }, { label: 'Calendário', icon: CalendarDays }]
  const shownTasks = active === 'Calendário' ? filtered.filter(t => t.date === 'Hoje' || t.date === 'Amanhã') : filtered

  const TaskCard = ({ task }) => (
    <article className="rounded-xl border border-[#eee8ed] bg-white p-4 transition hover:border-[#ddc9d5]">
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className={`rounded-md px-2 py-1 text-[11px] font-medium ${projectColors[task.project] || projectColors.Faculdade}`}>{task.project}</span>
        <div className="flex gap-1">
          <button onClick={() => editTask(task)} aria-label="Editar tarefa" className="rounded-md p-1.5 text-[#9b9299] hover:bg-[#f8f3f6] hover:text-[#a65d7c]"><Pencil size={14}/></button>
          <button onClick={() => updateTasks(list => list.filter(t => t.id !== task.id))} aria-label="Excluir tarefa" className="rounded-md p-1.5 text-[#9b9299] hover:bg-rose-50 hover:text-rose-600"><Trash2 size={14}/></button>
        </div>
      </div>
      <h3 className="text-sm font-semibold leading-5 text-[#39343a]">{task.title}</h3>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#f1edf0] pt-3 text-xs text-[#8f858d]">
        <span className="flex items-center gap-1.5"><Clock3 size={13}/>{task.date}</span>
        <span className={`flex items-center gap-1.5 ${task.priority === 'Alta' ? 'text-rose-600' : task.priority === 'Média' ? 'text-amber-600' : 'text-emerald-700'}`}><Flag size={12}/>{task.priority}</span>
      </div>
      <select aria-label="Alterar status" value={task.status} onChange={e => updateTasks(list => list.map(t => t.id === task.id ? { ...t, status: e.target.value } : t))} className="mt-3 w-full rounded-lg border border-[#eee8ed] bg-[#fcfafb] px-3 py-2 text-xs text-[#6f666d] outline-none focus:border-[#c98ca7]">
        {columns.map(c => <option key={c}>{c}</option>)}
      </select>
    </article>
  )

  return <div className="min-h-screen bg-[#faf8f9] text-[#39343a]">
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-[#eee8ed] bg-white px-5 py-6 transition-transform lg:translate-x-0 ${mobileMenu ? 'translate-x-0 shadow-xl' : '-translate-x-full'}`}>
      <div className="mb-10 flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#f5e8ee] text-[#a65d7c]"><Check size={19}/></div><span className="text-lg font-bold tracking-tight text-[#39343a]">taskflow<span className="text-[#c17d99]">.</span></span></div>
        <button onClick={() => setMobileMenu(false)} className="rounded-lg p-1 text-[#8f858d] lg:hidden"><X size={19}/></button>
      </div>
      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-[#aaa0a6]">Menu</p>
      <nav className="space-y-1">{nav.map(item => <button key={item.label} onClick={() => { setActive(item.label); setMobileMenu(false); setQuery('') }} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition ${active === item.label ? 'bg-[#f8eff3] text-[#9d5574]' : 'text-[#81777e] hover:bg-[#faf7f8]'}`}><item.icon size={17}/>{item.label}{item.label === 'Minhas tarefas' && <span className="ml-auto text-xs text-[#a99ca4]">{tasks.length}</span>}</button>)}</nav>
      <div className="mt-9"><p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-[#aaa0a6]">Projetos</p><div className="space-y-1">{[['Faculdade','bg-violet-400'],['Estudos','bg-pink-400'],['Projeto pessoal','bg-amber-400'],['Pessoal','bg-emerald-400']].map(([name,color]) => <button key={name} onClick={() => { setActive('Minhas tarefas'); setQuery(name); setMobileMenu(false) }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs text-[#81777e] hover:bg-[#faf7f8]"><span className={`h-2 w-2 rounded-full ${color}`}/>{name}</button>)}</div></div>
      <div className="mt-auto rounded-xl bg-[#f8f2f5] p-4"><p className="text-xs font-semibold text-[#795568]">Seu progresso</p><div className="mt-3 h-1.5 rounded-full bg-white"><div className="h-1.5 rounded-full bg-[#bd7894] transition-all" style={{ width: `${progress}%` }}/></div><div className="mt-2 flex justify-between text-[11px] text-[#927d88]"><span>{done} de {tasks.length} concluídas</span><span>{progress}%</span></div></div>
      <button onClick={() => setActive('Configurações')} className="mt-4 flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-[#81777e] hover:bg-[#faf7f8]"><Settings size={16}/>Configurações</button>
    </aside>

    {mobileMenu && <button aria-label="Fechar menu" onClick={() => setMobileMenu(false)} className="fixed inset-0 z-30 bg-black/20 lg:hidden"/>}
    <main className="min-h-screen lg:ml-60">
      <header className="flex h-[68px] items-center justify-between border-b border-[#eee8ed] bg-white px-5 sm:px-8">
        <div className="flex items-center gap-3"><button onClick={() => setMobileMenu(true)} className="rounded-lg p-2 text-[#81777e] lg:hidden"><Menu size={19}/></button><div><p className="text-[11px] capitalize text-[#a69ba2]">{today}</p><h1 className="text-sm font-semibold text-[#39343a]">{active === 'Visão geral' ? 'Visão geral' : active}</h1></div></div>
        <div className="relative hidden sm:block"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa0a6]" size={15}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar tarefas" className="w-56 rounded-lg border border-[#eee8ed] bg-[#fcfafb] py-2 pl-9 pr-3 text-xs outline-none focus:border-[#c98ca7]"/></div>
      </header>

      <div className="mx-auto max-w-[1400px] px-5 py-7 sm:px-8 lg:px-10">
        <section className="mb-7 flex flex-col justify-between gap-4 border-b border-[#eee8ed] pb-6 sm:flex-row sm:items-end"><div><p className="mb-1 text-xs font-medium text-[#a65d7c]">PAINEL DE ORGANIZAÇÃO</p><h2 className="text-2xl font-semibold tracking-tight text-[#39343a]">Olá! Vamos organizar o dia?</h2><p className="mt-1.5 text-sm text-[#8f858d]">Acompanhe suas atividades e mantenha tudo em ordem.</p></div><button onClick={openNew} className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#a65d7c] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#914d6b]"><Plus size={15}/> Nova tarefa</button></section>

        <section className="mb-8 grid gap-3 sm:grid-cols-3">
          {[['Todas as tarefas', tasks.length, 'Atividades cadastradas'], ['Em andamento', inProgress, 'Tarefas em execução'], ['Concluídas', done, 'Tarefas finalizadas']].map(([label,value,caption]) => <div key={label} className="rounded-xl border border-[#eee8ed] bg-white p-4"><p className="text-xs text-[#8f858d]">{label}</p><p className="mt-2 text-2xl font-semibold tracking-tight text-[#39343a]">{String(value).padStart(2,'0')}</p><p className="mt-1 text-[11px] text-[#aaa0a6]">{caption}</p></div>)}
        </section>

        <div className="mb-4 flex items-center justify-between gap-3"><div><h3 className="text-base font-semibold text-[#39343a]">{active === 'Calendário' ? 'Próximas tarefas' : 'Quadro de tarefas'}</h3><p className="mt-1 text-xs text-[#9b9198]">{shownTasks.length} {shownTasks.length === 1 ? 'atividade' : 'atividades'}</p></div><div className="flex items-center gap-2 rounded-lg border border-[#eee8ed] bg-white px-3 py-2 text-xs text-[#81777e]"><CalendarDays size={14}/> Esta semana <ChevronDown size={13}/></div></div>
        <div className="grid items-start gap-4 xl:grid-cols-3">{columns.map((column, index) => {
          const items = shownTasks.filter(t => t.status === column)
          return <section key={column} className="min-w-0 rounded-xl border border-[#eee8ed] bg-[#f5f1f3] p-3"><div className="mb-3 flex items-center justify-between px-1 py-1"><div className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${['bg-[#b58aa0]','bg-[#d4a0b5]','bg-[#8eb29b]'][index]}`}/><h4 className="text-xs font-semibold text-[#5e555b]">{column}</h4><span className="text-[11px] text-[#9b9198]">{items.length}</span></div><button onClick={() => { setForm(f => ({ ...f, status: column })); setEditing(null); setModal(true) }} aria-label={`Adicionar em ${column}`} className="rounded-md p-1 text-[#9b9198] hover:bg-white hover:text-[#a65d7c]"><Plus size={15}/></button></div><div className="space-y-2.5">{items.map(task => <TaskCard key={task.id} task={task}/>)}{items.length === 0 && <div className="rounded-lg border border-dashed border-[#ded5da] bg-white/60 px-3 py-8 text-center text-xs text-[#aaa0a6]">Nenhuma tarefa por aqui.</div>}</div></section>
        })}</div>
        <footer className="mt-8 border-t border-[#eee8ed] pt-4 text-[11px] text-[#aaa0a6]">Taskflow · Organize suas tarefas</footer>
      </div>
    </main>

    {modal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#30262c]/30 p-4"><form onSubmit={saveTask} className="w-full max-w-md rounded-2xl border border-[#eee8ed] bg-white p-6 shadow-xl"><div className="mb-5 flex items-center justify-between"><div><p className="text-[11px] font-medium text-[#a65d7c]">TAREFAS</p><h3 className="mt-1 text-lg font-semibold text-[#39343a]">{editing ? 'Editar tarefa' : 'Nova tarefa'}</h3></div><button type="button" onClick={() => setModal(false)} className="rounded-lg p-2 text-[#8f858d] hover:bg-[#f8f3f6]"><X size={18}/></button></div><label className="mb-1.5 block text-xs font-medium text-[#625960]">Título</label><input autoFocus required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="O que precisa ser feito?" className="mb-4 w-full rounded-lg border border-[#e9e1e6] px-3 py-2.5 text-sm outline-none focus:border-[#c98ca7]"/><div className="grid grid-cols-2 gap-3">{[['Projeto','project',['Faculdade','Estudos','Projeto pessoal','Pessoal']],['Prazo','date',['Hoje','Amanhã','Esta semana','Sem prazo']],['Prioridade','priority',['Baixa','Média','Alta']],['Status','status',columns]].map(([label,key,options]) => <div key={key}><label className="mb-1.5 block text-xs font-medium text-[#625960]">{label}</label><select value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} className="w-full rounded-lg border border-[#e9e1e6] bg-white px-3 py-2.5 text-xs text-[#625960] outline-none focus:border-[#c98ca7]">{options.map(option => <option key={option}>{option}</option>)}</select></div>)}</div><div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => setModal(false)} className="rounded-lg border border-[#e9e1e6] px-4 py-2.5 text-xs font-medium text-[#81777e] hover:bg-[#faf8f9]">Cancelar</button><button className="rounded-lg bg-[#a65d7c] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#914d6b]">{editing ? 'Salvar alterações' : 'Adicionar tarefa'}</button></div></form></div>}
  </div>
}
export default App
