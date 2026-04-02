insert into camping.site_sources (
  site_id,
  source_url,
  source_label,
  source_type,
  source_confidence,
  is_primary,
  notes
)
select
  s.id,
  s.primary_url,
  'Imported website',
  case
    when s.primary_url ~* '(fs\.usda\.gov|blm\.gov|nps\.gov|recreation\.gov|\.gov/)'
      then 'official'
    when s.primary_url ~* '(campendium|freecampsites|ioverlander|campbase|hipcamp|allstays|thedyrt)'
      then 'recreation'
    else 'other'
  end,
  70,
  true,
  'Imported from the v22.3.0 seed.'
from camping.sites s
where coalesce(s.primary_url, '') <> ''
on conflict (site_id, source_url) do nothing;
