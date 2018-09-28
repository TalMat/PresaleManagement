import OrderService       from '../services/OrderService';
import InventoryService   from '../services/InventoryService';
import PresaleService     from '../services/PresaleService';
import ReportService      from '../services/ReportService';

export default {
  ...OrderService,
  ...InventoryService,
  ...PresaleService,
  ...ReportService
}
