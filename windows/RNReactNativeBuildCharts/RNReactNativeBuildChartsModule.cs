using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace React.Native.Build.Charts.RNReactNativeBuildCharts
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNReactNativeBuildChartsModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNReactNativeBuildChartsModule"/>.
        /// </summary>
        internal RNReactNativeBuildChartsModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNReactNativeBuildCharts";
            }
        }
    }
}
