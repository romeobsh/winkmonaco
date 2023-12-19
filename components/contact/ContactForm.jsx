import { ArrowBack, Edit, Euro, Send } from '@mui/icons-material';
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Tab,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import Translation from '../general/Translation';
import { debounce } from 'lodash';
import IBAN from 'iban';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import SearchStatus from './SearchStatus';
import { translate } from '@/lib/translations/translate';
import SuccessModal from '../UI/SuccessModal';
import ContactFormLoading from './ContactFormLoading';

const ContactForm = ({ language, isLoading, onClick }) => {
  const [iban, setIban] = useState('');
  const [subscription, setSubscription] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const [isSending, setIsSending] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [customAmount, setCustomAmount] = useState(0);
  const [isOpened, setIsOpened] = useState(false);

  const [selectedOption, setSelectedOption] = useState('half');

  const isMobile = useMediaQuery('(max-width:600px)'); // Check if the screen width is less than or equal to 600px

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [tab, setTab] = useState('0');

  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
  };

  const handleChange = (event) => {
    let newIban = event.target.value
      .replace(/[^\dA-Z]/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();

    setIban(newIban);
    searchSubscriptionByIban(newIban);
  };

  const handleSubmit = async () => {
    setIsSending(true);
    const amountToSend = selectedOption === 'half' ? Math.round(subscription?.amount / 2) : customAmount;
    try {
      const response = await fetch(`/api/subscriptions/ibans/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          iban: iban.replace(/\s/g, ''),
          amount: tab === '0' ? amountToSend : undefined,
        }),
      });
      if (response.ok) {
        setIsOpened(true);
        setTimeout(() => {
          router.push('/');
        }, 2500);
      } else {
        enqueueSnackbar(translate({ tKey: 'general.errorOccurred', lang: language }), { variant: 'error' });
        setIsSending(false);
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(translate({ tKey: 'general.errorOccurred', lang: language }), { variant: 'error' });
      setIsSending(false);
    }
  };

  const searchSubscriptionByIban = debounce(async (iban) => {
    iban = iban.replace(/\s/g, '');

    if (IBAN.isValid(iban)) {
      try {
        setNotFound(false);
        setIsSearching(true);
        const response = await fetch(`/api/subscriptions/ibans/${iban}`);
        const data = await response.json();
        if (data.message) {
          setNotFound(true);
          setIsSearching(false);
        } else {
          setNotFound(false);
          setSubscription(data.subscription);
          setIsSearching(false);
        }
      } catch (error) {
        enqueueSnackbar('Une erreur est survenue, réessayez plus tard', { variant: 'error' });
        setIsSearching(false);
        return null;
      }
    } else {
      setSubscription(null);
    }
  }, 2000); // Debounce time: 2000ms (2 seconds)

  return (
    <Box>
      <SuccessModal
        opened={isOpened}
        title={translate({ tKey: 'general.received', lang: language }) + '!'}
        text={translate({ tKey: 'contact.asap', lang: language }) + '!'}
      />
      <Typography variant='h2' mb={2} sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
        <Translation tKey='contact.formTitle' lang={language} />
      </Typography>
      <Box sx={{ marginTop: '-1rem', textAlign: 'left' }}>
        <Button startIcon={<ArrowBack />} onClick={onClick}>
          <Translation tKey='general.back' lang={language} />
        </Button>
      </Box>
      <Paper sx={{ backgroundColor: '#f0f0f0', borderRadius: '1rem', padding: { xs: '1rem', md: '2rem' } }}>
        {isLoading && <ContactFormLoading />}
        {!isLoading && (
          <React.Fragment>
            <Typography mb={3}>{translate({ tKey: 'contact.firstLine', lang: language })}</Typography>
            <Grid container>
              <Grid item xs={12}>
                <Grid item xs={12} md={6} sx={{ margin: 'auto' }}>
                  <TextField label='IBAN' value={iban} onChange={handleChange} fullWidth disabled={isSearching} />
                </Grid>
                <SearchStatus
                  isSearching={isSearching}
                  subscription={subscription}
                  language={language}
                  notFound={notFound}
                />
                <Grid item xs={12} mt={3}>
                  <Typography variant='h6' mb={2}>
                    {translate({ tKey: 'contact.iWant', lang: language })}
                  </Typography>
                  <TabContext value={tab} sx={{ maxWidth: '100%' }}>
                    <TabList
                      onChange={handleChangeTab}
                      orientation={isMobile ? 'vertical' : 'horizontal'}
                      TabIndicatorProps={{ style: { backgroundColor: 'transparent', maxWidth: '100%' } }}
                      centered
                    >
                      <Tab
                        sx={{
                          margin: isMobile ? 'auto' : 'auto 2rem auto auto',
                          backgroundColor: tab === '0' ? 'white' : 'transparent',
                          color: 'text.main',
                          borderRadius: '1rem',
                          fontWeight: 600,
                          transition: 'all 0.5s ease-in-out',
                          '&.Mui-selected': { color: 'text.main' },
                        }}
                        label={translate({ tKey: 'contact.editDonation', lang: language })}
                        disabled={subscription === null}
                        value='0'
                      />
                      <Tab
                        sx={{
                          margin: isMobile ? '0.5rem auto auto' : 'auto auto auto 2rem',
                          backgroundColor: tab === '1' ? 'white' : 'transparent',
                          color: 'error.main',
                          borderRadius: '1rem',
                          fontWeight: 600,
                          transition: 'all 0.5s ease-in-out',
                          '&.Mui-selected': { color: 'error.main' },
                        }}
                        label={translate({ tKey: 'contact.stopDonation', lang: language })}
                        disabled={subscription === null}
                        value='1'
                      />
                    </TabList>
                    <Collapse in={subscription !== null}>
                      <TabPanel value='0'>
                        <FormControl sx={{ flexDirection: 'row', gap: { xs: '1.2rem', md: '2rem' }, margin: 'auto' }}>
                          <Badge
                            badgeContent={'50%'}
                            sx={{
                              display: subscription?.status !== 'cancelled' ? 'flex' : 'hidden',
                              '& .MuiBadge-badge': {
                                color: 'white',
                                backgroundColor: 'primary.main',
                              },
                            }}
                          >
                            <FormControlLabel
                              disabled={isSending}
                              control={
                                <Checkbox
                                  checked={selectedOption === 'half'}
                                  onChange={handleRadioChange}
                                  value='half'
                                />
                              }
                              label={
                                <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
                                  {subscription?.amount
                                    ? Math.round(subscription?.amount / 2)
                                    : subscription?.amountAsked
                                    ? Math.round(subscription?.amountAsked / 2)
                                    : 10}
                                  <Euro fontSize='small' />
                                </Typography>
                              }
                              value={
                                subscription?.amount
                                  ? Math.round(subscription?.amount / 2)
                                  : subscription?.amountAsked
                                  ? Math.round(subscription?.amountAsked / 2)
                                  : 10
                              }
                              sx={{
                                backgroundColor: 'white',
                                borderRadius: '1rem',
                                padding: { xs: '0.4rem 1rem 0.4rem 0.4rem', sm: '0.4rem 2rem 0.4rem 1.4rem' },
                                width: 'fit-content',
                                margin: 0,
                              }}
                            />
                          </Badge>
                          <FormControlLabel
                            disabled={isSending}
                            sx={{
                              backgroundColor: 'white',
                              borderRadius: '1rem',
                              padding: { xs: '0.4rem 1rem 0.4rem 0.4rem', sm: '0.4rem 2rem 0.4rem 1.4rem' },
                              width: 'fit-content',
                              margin: 'auto',
                            }}
                            control={
                              <Checkbox
                                checked={selectedOption === 'custom'}
                                onChange={handleRadioChange}
                                value='custom'
                              />
                            }
                            label={
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
                                  type='number'
                                  variant='standard'
                                  sx={{ width: 'fit-content', minWidth: '40px', maxWidth: '60px' }}
                                  onChange={(e) => setCustomAmount(e.target.value)}
                                  onClick={() => setSelectedOption('custom')}
                                  inputProps={{ min: 1, style: { textAlign: 'center' } }}
                                  InputProps={{
                                    sx: {
                                      width: 'fit-content',
                                      fontSize: '1.2rem',
                                      fontWeight: 600,
                                      '& input[type=number]': {
                                        MozAppearance: 'textfield',
                                      },
                                      '& input[type=number]::-webkit-outer-spin-button': {
                                        WebkitAppearance: 'none',
                                        margin: 0,
                                      },
                                      '& input[type=number]::-webkit-inner-spin-button': {
                                        WebkitAppearance: 'none',
                                        margin: 0,
                                      },
                                    },
                                  }}
                                />
                                {customAmount === 0 || customAmount === '' ? (
                                  <Edit fontSize='small' />
                                ) : (
                                  <Euro fontSize='small' />
                                )}
                              </Box>
                            }
                            value={customAmount}
                          />
                        </FormControl>
                      </TabPanel>
                      <TabPanel value='1'>
                        <Typography>{translate({ tKey: 'contact.stopFirstLine', lang: language })}</Typography>
                        <Typography>{translate({ tKey: 'contact.stopSecondLine', lang: language })}</Typography>
                      </TabPanel>
                    </Collapse>
                  </TabContext>
                </Grid>
                <Grid item xs={12} mt={2}>
                  <LoadingButton
                    loading={isSending}
                    variant='contained'
                    endIcon={<Send />}
                    disabled={
                      subscription === null ||
                      ((subscription?.status === 'cancelled' || subscription?.status === 'requestForCancellation') &&
                        tab === '1')
                    }
                    onClick={handleSubmit}
                  >
                    {translate({ tKey: 'general.send', lang: language })}
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </Paper>
    </Box>
  );
};

export default ContactForm;
