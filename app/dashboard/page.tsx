import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
// 1. IMPORTAR fetchCardData
import {
  fetchRevenue, 
  fetchLatestInvoices, 
  fetchCardData // <-- Adicionar esta importação
} from '@/app/lib/data';

export default async function Page() {
  
  // 2. CHAMA AS 3 FUNÇÕES DE DADOS (Pode ser feito em paralelo usando Promise.all)
  // Recomendo a versão do tutorial que as chama separadamente ou usa Promise.all
  // para deixar o código limpo, vamos usar o padrão do tutorial, que chama fetchCardData:
  
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();

  // 3. CHAMA E DESESTRUTURA OS DADOS DOS CARDS
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData(); // <-- Chamada para buscar os dados corretos!

  // 4. REMOVA SUA LÓGICA MANUAL E INCORRETA:
  /*
  const totalPaidInvoices = latestInvoices.filter((invoice: any) => invoice.status === 'paid')...
  const totalPendingInvoices = latestInvoices.filter((invoice: any) => invoice.status === 'pending')...
  const numberOfInvoices = latestInvoices.length;
  const numberOfCustomers = new Set(latestInvoices.map((invoice: any) => invoice.customerId)).size;
  */

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Agora essas variáveis existem e contêm os dados CORRETOS */}
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" /> 
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> 
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue}  />
        {/* Este componente agora deve renderizar corretamente, pois o código anterior 
           (que provavelmente estava quebrando a renderização) foi removido. */}
        <LatestInvoices latestInvoices={latestInvoices} /> 
      </div>
    </main>
  );
}