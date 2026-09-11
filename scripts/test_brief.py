import datetime as dt
import unittest
from update_brief import candidate, canonical_arxiv, merge_items
class BriefTests(unittest.TestCase):
    def test_continuous_time_is_not_continuous_state(self):
        self.assertFalse(candidate('Masked language diffusion', 'Discrete tokens with continuous-time training.'))
        self.assertTrue(candidate('Language generation', 'Diffusion in continuous-state embedding-space.'))
        self.assertFalse(candidate('ProxyFormer for Ultra-Long Context', 'A continuous-state language model'))
        self.assertFalse(candidate('Audio Language Models', 'A continuous-state language model for audio generation'))
        self.assertFalse(candidate('Vision-Language-Action policies', 'A language model uses flow matching.'))
        self.assertFalse(candidate('Latent diffusion for images', 'High quality image synthesis'))
    def test_version_identity(self):
        self.assertEqual(canonical_arxiv('http://arxiv.org/abs/2608.12345v2'), '2608.12345')
    def test_merge_retains_stale_source_deduplicates_and_expires(self):
        now=dt.datetime(2026,9,11,tzinfo=dt.timezone.utc)
        old=[{'id':'a','date':'2026-09-01T00:00:00Z'}, {'id':'b','date':'2026-01-01T00:00:00Z'}, {'id':'c','date':'2026-09-02T00:00:00Z'}]
        new=[{'id':'a','date':'2026-09-10T00:00:00Z'}, {'id':'future','date':'2027-01-01T00:00:00Z'}]
        self.assertEqual([x['id'] for x in merge_items(old,new,now)], ['a','c'])
if __name__=='__main__': unittest.main()
