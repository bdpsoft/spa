// ==================== MODULE: About Manager ====================
import { DataManager } from '../DataManager.js';

const aboutTemplates = {
    list: () => '',
    details: () => '',
    pickupList: () => '',
    form: () => '',
    default: () => `
        <div class="p-6 bg-gray-100 min-h-screen">

  <!-- HEADER & AKCIJE -->
  <div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 class="text-3xl font-extrabold text-gray-900">Kolekcija Projekata</h1>
      <p class="text-gray-600">Upravljajte vašim radovima i filterima</p>
    </div>
    
    <div class="flex items-center gap-3">
      <!-- Default akcije -->
      <button class="p-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition shadow-sm" title="Osveži">
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
      </button>
      <button class="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-200 flex items-center gap-2">
        <span>+</span> Novo
      </button>
    </div>
  </div>

  <!-- FILTERI I SELEKTOVANE AKCIJE -->
  <div class="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
    <div class="flex items-center gap-4">
      <select class="bg-transparent font-medium text-gray-700 outline-none cursor-pointer">
        <option>Sve kategorije</option>
        <option>Dizajn</option>
        <option>Development</option>
      </select>
      <div class="h-6 w-px bg-gray-200"></div>
      <span class="text-sm text-indigo-600 font-bold tracking-wide uppercase">3 selektovano</span>
    </div>

    <!-- Akcije za selektovano -->
    <div class="flex items-center gap-2">
      <button class="text-sm font-semibold text-gray-500 hover:text-gray-800 px-3 py-1">Arhiviraj</button>
      <button class="text-sm font-semibold text-red-500 hover:text-red-700 px-3 py-1 bg-red-50 rounded-lg">Obriši</button>
    </div>
  </div>

  <!-- GRID KOLEKCIJA -->
  <!-- Mobile: 1 kolona | Tablet: 2 kolone | Laptop: 3 kolone | Desktop: 4 kolone -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    
    <!-- KARTICA OBJEKTA (Ponavlja se) -->
    <div class="group relative bg-white rounded-3xl p-5 border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
      <!-- Checkbox u uglu -->
      <div class="absolute top-4 left-4 z-10">
        <input type="checkbox" class="w-5 h-5 rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer">
      </div>

      <!-- Vizuelni deo/Ikona -->
      <div class="w-full h-32 bg-indigo-50 rounded-2xl mb-4 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
        <span class="text-4xl">🎨</span>
      </div>

      <!-- Sadržaj -->
      <div class="space-y-2">
        <div class="flex justify-between items-start">
          <h3 class="font-bold text-gray-900 leading-tight">Brand Identity System</h3>
          <button class="text-gray-400 hover:text-gray-600">⋮</button>
        </div>
        <p class="text-sm text-gray-500 line-clamp-2">Kompletno rešenje vizuelnog identiteta za Fintech startup kompaniju.</p>
        
        <div class="pt-4 flex items-center justify-between border-t border-gray-50">
          <span class="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg uppercase tracking-wider">Aktivan</span>
          <span class="text-xs text-gray-400 font-medium">Pre 2 dana</span>
        </div>
      </div>
    </div>

    <!-- Još jedna kartica (primer) -->
    <div class="group relative bg-white rounded-3xl p-5 border-2 border-indigo-600 shadow-lg transition-all">
      <div class="absolute top-4 left-4 z-10">
        <input type="checkbox" checked class="w-5 h-5 rounded-md border-gray-300 text-indigo-600 cursor-pointer">
      </div>
      <div class="w-full h-32 bg-orange-50 rounded-2xl mb-4 flex items-center justify-center">
        <span class="text-4xl">📱</span>
      </div>
      <div class="space-y-2">
        <div class="flex justify-between items-start">
          <h3 class="font-bold text-gray-900 leading-tight">Mobile App Design</h3>
          <button class="text-gray-400">⋮</button>
        </div>
        <p class="text-sm text-gray-500 line-clamp-2">Dizajn interfejsa za iOS i Android aplikaciju za e-commerce.</p>
        <div class="pt-4 flex items-center justify-between border-t border-gray-50">
          <span class="px-2.5 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-lg uppercase tracking-wider">U izradi</span>
          <span class="text-xs text-gray-400 font-medium">Danas</span>
        </div>
      </div>
    </div>

    <!-- Dodaj još kartica po potrebi... -->

  </div>
</div>
    `
};

const aboutManager = new DataManager({
    storageKey: 'about_app',
    initialData: [],
    container: document.getElementById('app'),
    templates: aboutTemplates,
    methods: {}
});

// Add route handlers for About
aboutManager.listRoute = () => aboutManager.renderList();
aboutManager.detailsRoute = () => {};
aboutManager.formRoute = () => {};
aboutManager.pickupRoute = () => {};
aboutManager.name = 'About';

export { aboutManager };