import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Border, Color, FontFamily, FontSize, Padding } from '../../GlobalStyles';
import { GroupButtonHorizontal } from './button/GroupButton';
import {
  EcomSelected,
  FilterStatus,
  StoreSelected,
  TimerFilterForm,
  changeTimeFilter,
  selectedEcomByStore,
  selectedStoreByEcom,
  userInfo,
} from '../features/home/homeSlice';
import RadioButton from './button/RadioButton';
import DatePicker from 'react-native-date-picker'
// import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

export const PROP = [
  {
    key: '0',
    text: 'Tất cả',
    active: true,
  },
  {
    key: '14',
    text: 'Sendo',
    active: false,
  },
  {
    key: '1',
    text: 'Postmart',
    active: false,
  },
  {
    key: '15',
    text: 'Tiki',
    active: false,
  },
  {
    key: '13',
    text: 'Vỏ sò',
    active: false,
  },
  {
    key: '2',
    text: 'Lazada',
    active: false,
  },
  {
    key: '3',
    text: 'Shopee',
    active: false,
  },
];
const screenWidth = Math.round(Dimensions.get('window').width);

const PopupFilter = ({ onClose, onFilter }) => {
  const storeSelected = useSelector(StoreSelected);
  const ecomSelected = useSelector(EcomSelected);
  const [date, setDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [open, setOpen] = useState(false);
  const [openToTime, setOpenToTime] = useState(false);

  const timeObject = useSelector(TimerFilterForm);
  const isFilter = useSelector(FilterStatus);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };
  const dispatch = useDispatch();

  const handlerChangeStartTime = (timer) => {
    dispatch(changeTimeFilter(timer))
  }
  const handleCancel = () => {
    dispatch(selectedStoreByEcom(0));
  }

  return (
    <View style={[styles.popupfilter, styles.contentPosition,]}>


      <ScrollView>
        <View style={[styles.content, styles.contentPosition]}>
          <View style={[styles.header, styles.headerFlexBox]}>
            <TouchableOpacity
              onPress={() => {
                onClose();
              }}
              style={[styles.close3Icon, styles.iconLayout]}>
              <Image
                resizeMode="cover"
                source={require('../assets/close-3.png')}
              />
            </TouchableOpacity>
            <Text style={[styles.bLc, styles.bLcLayout, styles.bLcClr]}>
              Bộ lọc
            </Text>
          </View>
          <View style={[styles.content1, styles.mt16]}>
            <View style={styles.group}>
              <Text style={styles.header1}>Sàn thương mại điện tử</Text>
              <View style={[styles.group, styles.mt8]}>
                <View style={styles.filter}>
                  <RadioButton PROP={ecomSelected} />
                </View>
              </View>
            </View>
            <View style={[styles.group, styles.mt24]}>
              <Text style={styles.header1}>Gian hàng</Text>
              <View style={[styles.group, styles.mt8]}>
                <RadioButton PROP={storeSelected} TYPE={'ECOM'} />
              </View>
            </View>
            <View style={[styles.group, styles.mt24]}>
              <Text style={styles.header1}>Thời gian</Text>
              <View style={[styles.dateRange, styles.mt8, styles.headerFlexBox]}>

                <DatePicker
                  mode='date'
                  locale="vi"
                  modal
                  open={open}
                  date={timeObject.startTime}
                  onConfirm={(date) => {
                    setOpen(false)
                    //  setDate(date);
                    handlerChangeStartTime({
                      startTime: date,
                      endTime: timeObject.endTime
                    })
                  }}
                  onCancel={() => {
                    setOpen(false)
                  }}
                  title="Chọn mốc thời gian bắt đầu"
                  confirmText='Xác nhận'
                  cancelText='Huỷ'
                />
                <DatePicker
                  mode='date'
                  locale="vi"
                  title="Chọn mốc thời gian kết thúc"
                  confirmText='Xác nhận'
                  cancelText='Huỷ'
                  modal
                  open={openToTime}
                  date={timeObject.endTime}
                  onConfirm={(date) => {
                    setOpenToTime(false)
                    handlerChangeStartTime({
                      startTime: timeObject.startTime,
                      endTime: date
                    })
                  }}
                  onCancel={() => {
                    setOpenToTime(false)
                  }}
                />
                <TouchableOpacity style={[styles.button,]} onPress={() => setOpen(!open)}>
                  <Text style={[styles.ddmmyyyy, styles.ttCTypo, styles.ml16]}>
                    {Moment(timeObject.startTime).format('DD/MM/YYYY')}
                  </Text>
                  <Image
                    style={[styles.iconLayout, styles.ml4, styles.mr4]}
                    resizeMode="cover"
                    source={require('../assets/dateicon1.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.ml8]} onPress={() => setOpenToTime(true)}>

                  <Image
                    style={[styles.iconLayout, styles.ml4, styles.mr4]}
                    resizeMode="cover"
                    source={require('../assets/dateicon1.png')}
                  />
                  <Text style={[styles.ddmmyyyy, styles.ttCTypo, styles.ml16]}>
                    {Moment(timeObject.endTime).format('DD/MM/YYYY')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={[styles.buttonAction, { marginTop: 80, marginBottom: 20 }, styles.headerFlexBox,]}>
            <TouchableOpacity style={styles.buttonBorder} onPress={handleCancel}>
              <Text style={[styles.tLi, styles.ttCTypo]}>Đặt lại</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button3, styles.ml8, styles.buttonBorder]} onPress={() => {
              var ecomId = ecomSelected.filter((e, index) => {
                return e.active == true;
              });
              if (ecomId.length > 0) {
                ecomId = ecomId[0].key;
              } else {
                ecomId = null;
              }
              var storeID = storeSelected.filter((e, index) => {
                return e.active == true;
              })
              if (storeID.length > 0) {
                storeID = storeID[0].key;
                // storeID = storeID == undefined ? 0 : storeID;
              } else {
                storeID = null;
              }

              onFilter({ ecomId: ecomId, storeId: storeID, startTime: Moment(timeObject.startTime).format('YYYY/MM/DD'), endTime: Moment(timeObject.endTime).format('YYYY/MM/DD') })
            }}>
              <Text style={[styles.ttC, styles.ttCTypo]}>Tìm kiếm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ml16: {
    marginLeft: 16,
  },
  mr4: {
    marginRight: 4,
  },
  ml12: {
    marginLeft: 12,
  },
  mt12: {
    marginTop: 12,
  },
  mt8: {
    marginTop: 8,
  },
  ml4: {
    marginLeft: 4,
  },
  ml8: {
    marginLeft: 8,
  },
  mt24: {
    marginTop: 24,
  },
  mt16: {
    marginTop: 16,
  },
  contentPosition: {
    // backgroundColor: 'red',
    borderTopRightRadius: Border.br_5xl,
    borderTopLeftRadius: Border.br_5xl,
  },
  headerFlexBox: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLayout: {
    height: 24,
    width: 24,
    position: 'absolute',
    right: 8,
    zIndex: 100,
  },
  bLcLayout: {
    width: screenWidth,
    alignItems: 'center',
  },
  bLcClr: {
    color: Color.midnightblue_100,
    textAlign: 'center',
  },
  ttCTypo: {
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 20,
    fontSize: FontSize.size_sm,
  },
  autoAddedFramePosition: {
    bottom: 0,
    position: 'absolute',
  },
  buttonBorder: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
    borderColor: '#003ecf',
    borderRadius: Border.br_9xs,
    borderWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle: {
    borderRadius: Border.br_10xs_5,
    backgroundColor: '#b2b2b2',
    width: 26,
    height: 5,
  },
  rectangleWrapper: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_base,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  close3Icon: {
    zIndex: 0,
    overflow: 'hidden',
  },
  bLc: {
    // backgroundColor: 'red',
    fontSize: FontSize.size_base,
    lineHeight: 24,
    display: 'flex',
    textAlign: 'center',
    fontFamily: FontFamily.robotoMedium,
    fontWeight: '500',
    color: Color.midnightblue_100,

    justifyContent: 'center',
  },
  header: {
    zIndex: 0,
    alignSelf: 'stretch',
  },
  header1: {
    textAlign: 'left',
    lineHeight: 20,
    fontSize: FontSize.size_sm,
    color: Color.midnightblue_100,
    fontFamily: FontFamily.robotoMedium,
    fontWeight: '500',
    alignSelf: 'stretch',
  },
  ttC: {
    color: Color.white,
    textAlign: 'center',
  },
  item: {
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_5xs,
    borderRadius: Border.br_13xl,
    backgroundColor: Color.mediumslateblue_200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lazada: {
    textAlign: 'center',
  },
  item1: {
    borderWidth: 1,
    borderColor: '#e6ebf1',
    borderStyle: 'solid',
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_5xs,
    borderRadius: Border.br_13xl,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filter: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  group: {
    alignSelf: 'stretch',
  },
  filter2: {
    flexDirection: 'row',
  },
  ddmmyyyy: {
    color: Color.black,
    textAlign: 'left',
    flex: 1,
    // backgroundColor: 'red'
  },
  button: {
    // paddingLeft: Padding.p_base,
    paddingTop: Padding.p_5xs,
    paddingRight: Padding.p_xs,
    paddingBottom: Padding.p_5xs,
    borderRadius: Border.br_9xs,
    borderWidth: 1,
    borderColor: '#e6ebf1',
    borderStyle: 'solid',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  dateRange: {
    alignSelf: 'stretch',
  },
  content1: {
    zIndex: 1,
    alignSelf: 'stretch',
  },
  homeIndicator: {
    marginLeft: -66.5,
    bottom: 8,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.black,
    width: 134,
    left: '50%',
    position: 'absolute',
    height: 5,
  },
  systemLightHomeIndicato: {
    right: 0,
    left: 0,
    height: 34,
    zIndex: 0,
  },
  autoAddedFrame: {
    marginLeft: -187.5,
    zIndex: 2,
    left: '50%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  tLi: {
    color: Color.mediumslateblue_200,
    textAlign: 'center',
  },
  button3: {
    backgroundColor: Color.mediumslateblue_200,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
    borderColor: '#003ecf',
  },
  buttonAction: {
    // right: 16,
    // bottom: 58,
    // left: 16,
    // zIndex: 3,
    // position: "absolute",
    // marginTop: 32,
  },
  content: {
    backgroundColor: Color.white,
    margin: 16,
    flex: 1,
    alignSelf: 'stretch',
  },
  popupfilter: {
    // width: 375,
    // height: 500,
    maxWidth: '100%',
    maxHeight: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default PopupFilter;
