// Category filtering for Petra Brands
// Only show categories relevant to House of Party (Seasonal/Party) and Craft Hero (Crafts)

// Bucket A: Seasonal General Merchandise / Party keywords
const seasonalPartyKeywords = [
  'seasonal',
  'party',
  'parties',
  'party goods',
  'party ware',
  'partyware',
  'celebration',
  'celebrations',
  'occasion',
  'occasions',
  'holiday',
  'holidays',
  'halloween',
  'christmas',
  'easter',
  'valentine',
  'valentines',
  'july 4',
  'fourth of july',
  '4th of july',
  'thanksgiving',
  'new year',
  'st. patrick',
  'st patrick',
  'mother\'s day',
  'mothers day',
  'father\'s day',
  'fathers day',
  'graduation',
  'passover',
  'channukah',
  'hanukkah',
  'winter seasonal',
  'spring seasonal',
  'summer seasonal',
  'fall seasonal',
  'q4 holiday',
  'impulse',
  'endcap',
  'entertaining',
  'tableware',
  'paper goods',
  'paper plates',
  'cups',
  'napkins',
  'disposable dinnerware',
  'disposable cups',
  'disposable plates',
  'picnic',
  'picnicware',
  'decoration',
  'decorations',
  'décor',
  'decor',
  'balloon',
  'balloons',
  'banner',
  'banners',
  'streamer',
  'streamers',
  'gift wrap',
  'gift bag',
  'gift bags',
  'tissue paper',
  'bows',
  'ribbon',
  'ribbons',
  'piñata',
  'pinata',
  'party favor',
  'party favors',
  'treat bag',
  'treat bags',
  'goodie bag',
  'goodie bags',
  'birthday candle',
  'celebration candle',
  'candles',
  'hostess',
  'serveware',
  'disposable serve',
  'floral',
  'flowers',
  'gifts',
  'gift',
  'gifting',
  'cards',
  'stationery and gift',
  'greeting card',
  'toys',
  'puzzles',
  'games',
  'acrylics'
];

// Bucket B: Crafts / Office-Adjacent keywords
const craftKeywords = [
  'craft',
  'crafts',
  'crafting',
  'arts & crafts',
  'arts and crafts',
  'art supplies',
  'art supply',
  'diy',
  'maker kit',
  'hobby kit',
  'hobby',
  'hobbies',
  'kid craft',
  'kids craft',
  'children\'s activit',
  'childrens activit',
  'kid activit',
  'kids activit',
  'seasonal craft',
  'scrapbook',
  'paper craft',
  'knitting',
  'crochet',
  'sewing',
  'needlecraft',
  'needle craft',
  'beading',
  'jewelry making',
  'model kit',
  'paint',
  'brush',
  'canvas',
  'latch hook',
  'weaving',
  'embroidery',
  'punch needle',
  'activity kit',
  'creative',
  'school supplies', // Often includes craft kits at some retailers
  'office/school supplies', // Walmart/Target often group crafts here
  'office supplies' // Will need to verify these
];

// Explicit exclusion keywords - if these appear WITHOUT relevant keywords, exclude
const exclusionKeywords = [
  'grocery',
  'food',
  'beverage',
  'dairy',
  'frozen',
  'produce',
  'meat',
  'bakery',
  'deli',
  'health',
  'beauty',
  'personal care',
  'cosmetic',
  'haba',
  'pharmacy',
  'otc',
  'pet',
  'automotive',
  'electronic',
  'technology',
  'apparel',
  'footwear',
  'clothing',
  'furniture',
  'home improvement',
  'hardware',
  'tools',
  'lawn & garden',
  'sporting good',
  'fitness',
  'baby',
  'infant',
  'cleaning',
  'household chemical',
  'kitchen appliance',
  'cookware',
  'home fragrance',
  'air freshener',
  // Removed 'candle' - now handled in party keywords
  'water',
  'sparkling',
  'seltzer',
  'film/electronic',
  'food storage'
];

// Categories that need manual verification (ambiguous)
const ambiguousPatterns = [
  'general merchandise',
  'misc.',
  'miscellaneous',
  'other',
  'gm/hbc',
  'seasonal/hbc'
];

/**
 * Check if a category matches Seasonal/Party bucket
 */
function matchesSeasonalParty(category) {
  const lower = category.toLowerCase();
  return seasonalPartyKeywords.some(kw => lower.includes(kw));
}

/**
 * Check if a category matches Crafts bucket
 */
function matchesCrafts(category) {
  const lower = category.toLowerCase();
  return craftKeywords.some(kw => lower.includes(kw));
}

/**
 * Check if a category should be explicitly excluded
 */
function shouldExclude(category) {
  const lower = category.toLowerCase();

  // Check if it has exclusion keywords
  const hasExclusion = exclusionKeywords.some(kw => lower.includes(kw));

  // But if it also has relevant keywords, don't exclude
  const hasRelevant = matchesSeasonalParty(category) || matchesCrafts(category);

  // Special case: "candle" is excluded UNLESS it's "birthday candle" or "celebration candle"
  if (lower.includes('candle') && !lower.includes('birthday') && !lower.includes('celebration')) {
    // Check if it's in a seasonal/party context
    if (!matchesSeasonalParty(category)) {
      return true;
    }
  }

  return hasExclusion && !hasRelevant;
}

/**
 * Check if a category is ambiguous and needs verification
 */
function isAmbiguous(category) {
  const lower = category.toLowerCase();

  // If it's clearly in one of our buckets, it's not ambiguous
  if (matchesSeasonalParty(category) || matchesCrafts(category)) {
    // Unless it's a very generic term
    const isGeneric = ambiguousPatterns.some(p => {
      // Check if the category is ONLY the generic term (not just contains it)
      return lower.includes(p) && !seasonalPartyKeywords.some(kw => lower.includes(kw) && kw !== 'seasonal');
    });
    return isGeneric;
  }

  return ambiguousPatterns.some(p => lower.includes(p));
}

/**
 * Determine which brand a category belongs to
 */
export function assignBrand(category) {
  const isParty = matchesSeasonalParty(category);
  const isCraft = matchesCrafts(category);

  if (isParty && isCraft) return 'Both';
  if (isParty) return 'House of Party';
  if (isCraft) return 'Craft Hero';

  // Default for ambiguous categories
  return 'House of Party';
}

/**
 * Main function to filter and categorize a review
 * Returns { included: boolean, brand: string, needsVerification: boolean }
 */
export function categorizeReview(category) {
  // Check for explicit exclusions first
  if (shouldExclude(category)) {
    return { included: false, brand: null, needsVerification: false };
  }

  // Check if it matches our relevant categories
  const isParty = matchesSeasonalParty(category);
  const isCraft = matchesCrafts(category);

  if (isParty || isCraft) {
    return {
      included: true,
      brand: assignBrand(category),
      needsVerification: isAmbiguous(category)
    };
  }

  // Check for ambiguous categories that might be relevant
  if (isAmbiguous(category)) {
    return {
      included: true,
      brand: 'House of Party', // Default
      needsVerification: true
    };
  }

  // Not in our target categories
  return { included: false, brand: null, needsVerification: false };
}

/**
 * Filter an array of reviews to only relevant categories
 */
export function filterRelevantCategories(reviews) {
  return reviews.map(review => {
    const result = categorizeReview(review.category);
    return {
      ...review,
      categoryIncluded: result.included,
      brand: result.included ? result.brand : review.brand,
      needsVerification: result.needsVerification
    };
  });
}

/**
 * Check if a review's category is relevant
 */
export function isCategoryRelevant(category) {
  return categorizeReview(category).included;
}
