// src/hooks/useTours.js
import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export function useTours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("tours")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTours(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { tours, loading, error, refetch: fetchTours };
}

export function useTour(slug) {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    const fetchTour = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("tours")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) throw error;
        setTour(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [slug]);

  return { tour, loading, error };
}