'use client';

import { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, Package } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  nameZh: string;
  category: string;
  price: number | null;
  rentalPrice: number | null;
  active: boolean;
};

const mockProducts: Product[] = [
  { id: '1', name: 'Professional Guzheng', nameZh: '专业古筝', category: 'INSTRUMENT', price: 2800, rentalPrice: null, active: true },
  { id: '2', name: 'Student Erhu', nameZh: '学生二胡', category: 'INSTRUMENT', price: 450, rentalPrice: null, active: true },
  { id: '3', name: 'Beginner Dizi Set', nameZh: '初学笛子套装', category: 'INSTRUMENT', price: 120, rentalPrice: null, active: true },
  { id: '4', name: 'Classic Hanfu - Women', nameZh: '经典女款汉服', category: 'HANFU', price: null, rentalPrice: 80, active: true },
  { id: '5', name: 'Children Hanfu Set', nameZh: '儿童汉服套装', category: 'HANFU', price: null, rentalPrice: 50, active: true },
  { id: '6', name: 'Red Performance Dress', nameZh: '红色演出服', category: 'PERFORMANCE_WEAR', price: null, rentalPrice: 60, active: true },
  { id: '7', name: 'Practice Room - 1 Hour', nameZh: '琴房 - 1小时', category: 'PRACTICE_ROOM', price: 25, rentalPrice: null, active: true },
  { id: '8', name: 'Concert Pipa', nameZh: '演奏级琵琶', category: 'INSTRUMENT', price: 3500, rentalPrice: null, active: false },
];

const categoryLabels: Record<string, string> = {
  INSTRUMENT: 'Instrument',
  HANFU: 'Hanfu',
  PERFORMANCE_WEAR: 'Performance Wear',
  PRACTICE_ROOM: 'Practice Room',
};

const categoryColors: Record<string, string> = {
  INSTRUMENT: 'bg-blue-100 text-blue-700',
  HANFU: 'bg-purple-100 text-purple-700',
  PERFORMANCE_WEAR: 'bg-pink-100 text-pink-700',
  PRACTICE_ROOM: 'bg-green-100 text-green-700',
};

export default function AdminShopPage() {
  const [products, setProducts] = useState(mockProducts);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.nameZh.includes(search);
    const matchCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchSearch && matchCategory;
  });

  const categories = ['all', ...new Set(products.map(p => p.category))];

  function toggleActive(id: string) {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  }

  function deleteProduct(id: string) {
    setProducts(prev => prev.filter(p => p.id !== id));
  }

  return (
    <DashboardShell role="admin" userName="Admin">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Product Management</h1>
          <p className="text-sm text-muted-foreground">{products.length} products total</p>
        </div>
        <Button>
          <Plus className="mr-2 size-4" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="flex flex-col gap-4 py-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={filterCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterCategory(cat)}
              >
                {cat === 'all' ? 'All' : categoryLabels[cat] || cat}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Product</th>
                <th className="px-4 py-3 text-left font-medium">Category</th>
                <th className="px-4 py-3 text-left font-medium">Price</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-muted-foreground">{product.nameZh}</div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className={categoryColors[product.category]}>
                      {categoryLabels[product.category]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {product.price && <div>${product.price}</div>}
                    {product.rentalPrice && <div className="text-xs text-muted-foreground">${product.rentalPrice}/rental</div>}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="secondary"
                      className={product.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}
                    >
                      {product.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => toggleActive(product.id)}>
                        <Package className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <Edit className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" className="text-destructive" onClick={() => deleteProduct(product.id)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardShell>
  );
}
