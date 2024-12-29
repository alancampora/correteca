import { useEffect, useState } from "react";
import { BusinessObject } from "@common/BusinessObject";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { fetchBusinessObjects } from "./api/BusinessObject";
import Landing from "./components/Landing";

const BusinessObjectList = () => {
  const [businessObjects, setBusinessObjects] = useState<BusinessObject[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBusinessObjects();
        setBusinessObjects(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!businessObjects.length) {
    return <div className="text-gray-500">No BusinessObjects found.</div>;
  }

  return <Landing />;
};

/*{businessObjects.map((bo) => (
          <Card key={bo.name} className="p-4 shadow">
            <CardHeader>
              <h2 className="text-lg font-bold">{bo.name}</h2>
              <h3 className="text-sm text-gray-500">{bo.subTitle}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800">Price: ${bo.price.toFixed(2)}</p>
            </CardContent>
          </Card>
        ))}
        </>
*/

export default BusinessObjectList;
