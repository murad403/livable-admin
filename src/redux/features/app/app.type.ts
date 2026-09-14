export interface TClient {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  target_destination: string;
  visa: string;
  target_arrival_timeline: string;
  household_size: string;
  lead_advisor_name: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TCreateClientInput {
  full_name: string;
  email: string;
  phone: string;
  target_destination: string;
  visa: string;
  target_arrival_timeline: string;
  household_size: string;
  lead_advisor_name: string;
  notes?: string;
}

export interface TRequestedClient {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  relocation_process_type: string;
  considering_places_type: string[];
  scouting_people_type: string;
  created_at?: string;
}

export interface TScoutingTrip {
  id: number;
  tour_id: number;
  client_id: number;
  client_name: string;
  email: string;
  visa: string;
  city: string;
  timeline: string;
  guide_name: string;
  property_views: number;
  created_at?: string;
  updated_at?: string;
}

export interface TCreateScoutingTripInput {
  clientId: number;
  data: {
    city: string;
    timeline: string;
    guide_name: string;
    property_views: number;
  };
}

export interface TUpdateScoutingTripInput {
  clientId: number;
  id: number;
  data: {
    city?: string;
    timeline?: string;
    guide_name?: string;
    property_views?: number;
  };
}

export interface TDeleteScoutingTripInput {
  clientId: number;
  id: number;
}

export interface TScoutingTripsResponse {
  total_clients: number;
  total_trips: number;
  trips: TScoutingTrip[];
}

export interface TExternalLink {
  label: string;
  url: string;
}

export interface TCityTest {
  id: string;
  category_id?: string;
  category?: string;
  title: string;
  city: string;
  short_description: string;
  google_maps_link: string;
  external_links: TExternalLink[];
  note_prompts: string[];
  question_prompts: string[];
  order: number;
  created_at?: string;
  updated_at?: string;
}

export interface TCreateCityTestInput {
  id: string;
  city: string;
  category: string;
  title: string;
  short_description: string;
  google_maps_link: string;
  external_links: TExternalLink[];
  note_prompts: string[];
  question_prompts: string[];
  order: number;
}

export interface TUpdateCityTestInput {
  id: string;
  data: Partial<TCreateCityTestInput>;
}



