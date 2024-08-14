import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Cat } from 'lucide-react';

const fetchCatFact = async () => {
  const response = await fetch('https://catfact.ninja/fact');
  if (!response.ok) {
    throw new Error('Failed to fetch cat fact');
  }
  return response.json();
};

const CatFactCard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['catFact'],
    queryFn: fetchCatFact,
  });

  if (isLoading) return <Skeleton className="h-[100px] w-full" />;
  if (error) return <p>Error loading cat fact</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cat className="h-6 w-6" />
          Cat Fact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{data.fact}</p>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">All About Cats</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Cat Breeds</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Siamese</li>
              <li>Persian</li>
              <li>Maine Coon</li>
              <li>Bengal</li>
              <li>Scottish Fold</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cat Characteristics</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge>Independent</Badge>
            <Badge>Curious</Badge>
            <Badge>Playful</Badge>
            <Badge>Agile</Badge>
            <Badge>Affectionate</Badge>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Cat Image</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src="https://placekitten.com/800/400"
              alt="A cute cat"
              className="w-full h-auto rounded-lg shadow-md mx-auto object-cover"
            />
          </CardContent>
        </Card>

        <CatFactCard />
      </div>
    </div>
  );
};

export default Index;