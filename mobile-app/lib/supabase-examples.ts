// Example usage of Supabase in your Expo app
import { supabase } from './supabase';

// Example: Authentication functions
export const authExamples = {
  // Sign up a new user
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  },

  // Sign in existing user
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // Listen to auth changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Example: Database operations
export const databaseExamples = {
  // Fetch data from a table
  async fetchData(tableName: string) {
    const { data, error } = await supabase
      .from(tableName)
      .select('*');
    
    if (error) throw error;
    return data;
  },

  // Insert data
  async insertData(tableName: string, newData: any) {
    const { data, error } = await supabase
      .from(tableName)
      .insert([newData])
      .select();
    
    if (error) throw error;
    return data;
  },

  // Update data
  async updateData(tableName: string, id: number, updates: any) {
    const { data, error } = await supabase
      .from(tableName)
      .update(updates)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data;
  },

  // Delete data
  async deleteData(tableName: string, id: number) {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Example: Real-time subscriptions
export const realtimeExamples = {
  // Subscribe to table changes
  subscribeToTable(tableName: string, callback: (payload: any) => void) {
    return supabase
      .channel(`public:${tableName}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: tableName }, 
        callback
      )
      .subscribe();
  },

  // Unsubscribe from channel
  unsubscribe(subscription: any) {
    return supabase.removeChannel(subscription);
  }
};

// Example usage in a React component:
/*
import { useEffect, useState } from 'react';
import { authExamples, databaseExamples } from '@/lib/supabase-examples';

export default function ExampleComponent() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Check for authenticated user
    authExamples.getCurrentUser().then(setUser);

    // Listen for auth changes
    const { data: { subscription } } = authExamples.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      await authExamples.signIn(email, password);
    } catch (error) {
      console.error('Sign in error:', error.message);
    }
  };

  const fetchTableData = async () => {
    try {
      const tableData = await databaseExamples.fetchData('your_table_name');
      setData(tableData);
    } catch (error) {
      console.error('Fetch error:', error.message);
    }
  };

  return (
    // Your component JSX here
  );
}
*/
